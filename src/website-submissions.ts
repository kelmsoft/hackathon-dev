import fs from 'fs/promises';
import path from 'path';

import puppeteer, { Page, ElementHandle, Browser } from 'puppeteer';

import { supabase } from './supabase';

// Mode options
enum ScraperMode {
  THREAD = 'thread',
  INDIVIDUAL = 'individual',
}

const TWEET_URL = 'https://x.com/boltdotnew/status/1902102762151875053';
const UNPARSED_SUBMISSIONS_PATH = path.join(
  __dirname,
  'data/unparses-submissions.json'
);

type Submission = {
  author: string;
  image: string;
  handle: string;
  websiteUrl: string;
  tweetUrl: string;
  videoUrl: string;
  votes: number;
  created_at: string;
};

// Parse command line arguments to determine mode
const args = process.argv.slice(2);
const mode = args.includes('--individual')
  ? ScraperMode.INDIVIDUAL
  : ScraperMode.THREAD;

main()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

async function main() {
  await fs.mkdir(path.join(__dirname, './data'), { recursive: true });

  let browser: Browser | null = null;

  try {
    console.log('Attempting to connect to Chrome with remote debugging...');

    try {
      // First try to connect directly by getting the WebSocket endpoint
      const response = await fetch('http://localhost:7572/json/version');
      const data = await response.json();
      const webSocketDebuggerUrl = data.webSocketDebuggerUrl;

      if (!webSocketDebuggerUrl) {
        throw new Error('Could not retrieve webSocketDebuggerUrl');
      }

      console.log('Found Chrome debugging session, connecting...');
      browser = await puppeteer.connect({
        browserWSEndpoint: webSocketDebuggerUrl,
        defaultViewport: null,
      });
      console.log('Successfully connected to Chrome!');
    } catch (err) {
      console.error('Error connecting to Chrome:', err);
      throw new Error(
        'Failed to connect to Chrome with remote debugging. Make sure Chrome is running with --remote-debugging-port=7572'
      );
    }

    if (mode === ScraperMode.THREAD) {
      console.log(
        'Running in THREAD mode - processing submissions from announcement thread'
      );
      await runThreadMode(browser);
    } else {
      console.log(
        'Running in INDIVIDUAL mode - processing unparsed submissions'
      );
      await runIndividualMode(browser);
    }
  } finally {
    if (browser) {
      await browser.disconnect();
      console.log(
        'Disconnected from Chrome. You can continue using your browser.'
      );
    }
  }
}

/**
 * Runs the scraper in thread mode - continuously polls the announcement thread for submissions
 */
async function runThreadMode(browser: Browser): Promise<void> {
  while (true) {
    console.log('Starting to scrape submissions from thread...');

    const submissions = await scrapeSubmissions(browser);

    // Save submissions to a JSON file
    const outputPath = path.join(__dirname, 'data/submissions.json');
    await fs.writeFile(outputPath, JSON.stringify(submissions, null, 2));

    console.log(`Found ${submissions.length} valid submissions`);
    console.log(`Submissions saved to ${outputPath}`);

    // Write submissions to Supabase
    await writeSubmissionsToSupabase(submissions);

    await sleep(60_000);
  }
}

/**
 * Runs the scraper in individual mode - processes each URL from unparses-submissions.json
 */
async function runIndividualMode(browser: Browser): Promise<void> {
  console.log(`Reading unparsed submissions from ${UNPARSED_SUBMISSIONS_PATH}`);

  try {
    await fs.access(UNPARSED_SUBMISSIONS_PATH, fs.constants.F_OK);
  } catch (err) {
    console.error(`File not found: ${UNPARSED_SUBMISSIONS_PATH}`);
    return;
  }

  const unparsedUrls: string[] = JSON.parse(
    await fs.readFile(UNPARSED_SUBMISSIONS_PATH, 'utf-8')
  );
  console.log(
    `Found ${unparsedUrls.length} unparsed submission URLs to process`
  );

  const submissions: Submission[] = [];
  let processedCount = 0;

  for (const tweetUrl of unparsedUrls) {
    try {
      console.log(
        `Processing URL ${++processedCount}/${unparsedUrls.length}: ${tweetUrl}`
      );
      const tweetSubmission = await processSingleTweet(browser, tweetUrl);

      if (tweetSubmission) {
        submissions.push(tweetSubmission);

        // Write each submission to Supabase immediately
        await writeSubmissionsToSupabase([tweetSubmission]);

        console.log(
          `Successfully processed submission from @${tweetSubmission.handle}`
        );
      } else {
        console.log(`No valid submission found at URL: ${tweetUrl}`);
      }

      // Add a small delay between processing tweets to avoid rate limiting
      await sleep(3000);
    } catch (error) {
      console.error(`Error processing tweet URL ${tweetUrl}:`, error);
    }
  }

  // Save all submissions to a JSON file
  const outputPath = path.join(
    __dirname,
    'data/unparsed-submissions-results.json'
  );
  await fs.writeFile(outputPath, JSON.stringify(submissions, null, 2));

  console.log(`Processed ${processedCount}/${unparsedUrls.length} URLs`);
  console.log(`Found ${submissions.length} valid submissions`);
  console.log(`Results saved to ${outputPath}`);
}

// First, add this new shared function
async function parseTweetElement(
  page: Page,
  tweetElement: ElementHandle<Element>,
  alwaysReturnSubmission: boolean,
  tweetUrl?: string
): Promise<Submission | null> {
  try {
    // Get tweet time element which typically has a unique datetime
    const timeElement = await tweetElement.$('time');
    let tweetDatetime = '';
    let extractedTweetUrl = tweetUrl || ''; // Use provided URL if available

    if (timeElement) {
      tweetDatetime = await page.evaluate(
        (el) => el.getAttribute('datetime') || '',
        timeElement
      );

      // Only extract URL if not provided
      if (!tweetUrl) {
        const parentAnchorHandle = await page.evaluateHandle((el) => {
          return el ? el.closest('a') : null;
        }, timeElement);

        try {
          const parentElement = parentAnchorHandle.asElement();
          if (parentElement) {
            extractedTweetUrl = await page.evaluate(
              (el) => el.getAttribute('href') || '',
              parentElement as ElementHandle<HTMLAnchorElement>
            );

            if (extractedTweetUrl && !extractedTweetUrl.startsWith('http')) {
              extractedTweetUrl = `https://x.com${extractedTweetUrl}`;
            }
          }
        } finally {
          await parentAnchorHandle.dispose();
        }
      }
    }

    // Extract the handle
    const handleElement = await tweetElement.$('[data-testid="User-Name"]');
    let handle = '';
    let author = '';

    if (handleElement) {
      const handleText = await page.evaluate(
        (el) => el.textContent,
        handleElement
      );

      if (handleText) {
        const authorMatch = handleText.match(/([^@\n]+)@/);
        author = authorMatch ? authorMatch[1].trim() : '';

        const handleMatch = handleText.match(/@([^\s\n]+)/);
        handle = handleMatch ? handleMatch[1] : '';
      }
    }

    // Skip if no handle found
    if (!handle) {
      return null;
    }

    // Extract URLs from tweet
    const urlElement = await tweetElement.$('a[role="link"][target="_blank"]');
    let websiteUrl = '';

    if (urlElement) {
      const href = await page.evaluate((el) => el.text, urlElement);
      if (href.includes('netlify.app')) {
        websiteUrl = href;
      }
    }

    // Extract video URL and poster image
    let videoUrl = '';
    let imageUrl = '';

    try {
      // First check for video content
      const videoElement = await tweetElement.$('video');
      if (videoElement) {
        // Found a video element
        const posterImage = await page.evaluate(
          (el) => el.getAttribute('poster'),
          videoElement
        );

        // Get video source
        const sourceElement = await videoElement.$('source');
        let videoSource = '';
        if (sourceElement) {
          videoSource =
            (await page.evaluate(
              (el) => el.getAttribute('src'),
              sourceElement
            )) || '';
        }

        // If no source element found, try video src directly
        if (!videoSource) {
          videoSource =
            (await page.evaluate(
              (el) => el.getAttribute('src'),
              videoElement
            )) || '';
        }

        // Check if it's a native X video
        if (
          videoSource &&
          (videoSource.includes('x.com') || videoSource.startsWith('blob:'))
        ) {
          // Native X video - use poster as image and empty video URL
          videoUrl = '';
          imageUrl = posterImage || '';
        } else {
          // External video - use video source and empty image URL
          videoUrl = videoSource;
          imageUrl = '';
        }
      } else {
        // No video found, look for images
        const mediaContainer = await tweetElement.$(
          '[data-testid="tweetPhoto"]'
        );
        if (mediaContainer) {
          const imageElement = await mediaContainer.$('img');
          if (imageElement) {
            imageUrl =
              (await page.evaluate(
                (el) => el.getAttribute('src'),
                imageElement
              )) || '';
          }
        }

        // If still no image found, try card image
        if (!imageUrl) {
          const cardImage = await tweetElement.$(
            'a[data-testid="card.wrapper"] img'
          );
          if (cardImage) {
            imageUrl =
              (await page.evaluate(
                (el) => el.getAttribute('src'),
                cardImage
              )) || '';
          }
        }
      }
    } catch (error) {
      console.error('Error extracting video/image:', error);
    }

    // Extract website preview image if we don't already have a poster image
    let websitePreviewImage = '';
    if (!imageUrl) {
      try {
        const mediaContainer = await tweetElement.$(
          '[data-testid="tweetPhoto"]'
        );
        if (mediaContainer) {
          const imageElement = await mediaContainer.$('img');
          if (imageElement) {
            websitePreviewImage =
              (await page.evaluate(
                (el) => el.getAttribute('src'),
                imageElement
              )) || '';
          }
        }

        if (!websitePreviewImage) {
          const cardImage = await tweetElement.$(
            'a[data-testid="card.wrapper"] img'
          );
          if (cardImage) {
            websitePreviewImage =
              (await page.evaluate(
                (el) => el.getAttribute('src'),
                cardImage
              )) || '';
          }
        }
      } catch (error) {
        console.error('Error extracting website preview image:', error);
      }
    }

    // Skip tweets without either a website URL, a video URL, or an image
    // If alwaysReturnSubmission is true, we will return a submission even if there is none of these
    if (
      !alwaysReturnSubmission &&
      !websiteUrl &&
      !videoUrl &&
      !imageUrl &&
      !websitePreviewImage
    ) {
      return null;
    }

    // Extract votes
    let votes = 0;
    try {
      const likeElement = await tweetElement.$('[data-testid="like"]');
      if (likeElement) {
        const likeCountElement = await likeElement.$(
          'span[data-testid="app-text-transition-container"]'
        );
        if (likeCountElement) {
          const likeCountText = await page.evaluate(
            (el) => el.textContent,
            likeCountElement
          );
          if (likeCountText) {
            const parsedCount = parseInt(likeCountText.replace(/,/g, ''), 10);
            if (!isNaN(parsedCount)) {
              votes = parsedCount;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error extracting votes:', error);
    }

    const submission: Submission = {
      author,
      image: imageUrl || websitePreviewImage || '', // Use imageUrl as primary image, fallback to preview image
      handle,
      websiteUrl: websiteUrl || '',
      tweetUrl: extractedTweetUrl,
      videoUrl,
      votes,
      created_at: tweetDatetime,
    };

    if (submission) {
      const mediaInfo = videoUrl
        ? `External video: ${videoUrl}`
        : imageUrl.includes('ext_tw_video_thumb')
          ? 'Native X video with poster'
          : imageUrl
            ? 'Image found'
            : 'No media';

      console.log(
        `Found submission from ${submission.author} (@${submission.handle}): ${submission.websiteUrl}, ${mediaInfo}`
      );
    }

    return submission;
  } catch (error) {
    console.error('Error parsing tweet:', error);
    return null;
  }
}

// Then update processSingleTweet to use the shared function
async function processSingleTweet(
  browser: Browser,
  tweetUrl: string
): Promise<Submission | null> {
  let page: Page | null = null;
  try {
    page = await browser.newPage();
    console.log(`Navigating to tweet URL: ${tweetUrl}`);

    await page.goto(tweetUrl, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    await sleep(5000);

    // Get all tweet elements and select the last one
    const tweetElements = await page.$$('[data-testid="tweet"]');
    if (!tweetElements.length) {
      console.log('No tweet found on the page');
      return null;
    }

    // Get the last element
    const tweetElement = tweetElements[tweetElements.length - 1];

    const submission = await parseTweetElement(
      page,
      tweetElement,
      true,
      tweetUrl
    );
    if (submission) {
      console.log(
        `Found valid submission from ${submission.author} (@${submission.handle}): ${submission.websiteUrl}${
          submission.videoUrl
            ? `, Video: ${submission.videoUrl}`
            : submission.image.includes('ext_tw_video_thumb')
              ? ', Native X video with poster image'
              : ''
        }${
          submission.image ? ', Image: Found' : ', Image: Not found'
        }, Votes: ${submission.votes}`
      );
    }

    return submission;
  } catch (error) {
    console.error('Error processing tweet:', error);
    return null;
  } finally {
    await page?.close();
  }
}

async function scrapeSubmissions(browser: Browser): Promise<Submission[]> {
  let page: Page | null = null;
  try {
    // Get all pages and reuse the first one, or create new if none exist
    page = await browser.newPage();
    console.log('Navigating to tweet URL...');

    await page.goto(TWEET_URL, {
      waitUntil: 'networkidle2',
      timeout: 60000, // Increase timeout to 60 seconds
    });

    console.log(
      'Page loaded. If you need to log in to Twitter/X, please do so now.'
    );
    // console.log(
    //   'Press Enter in this terminal when you are ready to continue...'
    // );

    // Wait for user to press Enter
    // await new Promise<void>((resolve) => {
    //   process.stdin.once('data', () => {
    //     console.log('Continuing with scraping...');
    //     resolve();
    //   });
    // });

    await sleep(10_000);

    console.log('Starting to scroll and process tweets incrementally...');

    // Extract all replies
    const submissions: Submission[] = [];

    // Keep track of processed tweet URLs to avoid duplicates
    const processedTweetIds = new Set<string>();

    // Scroll and process in smaller batches to avoid missing tweets due to lazy rendering
    const _lastTweetCount = 0; // Unused but might be useful for future enhancements
    let noNewTweetsCounter = 0;
    let totalProcessed = 0;

    // Continue scrolling until we've found no new tweets for a few consecutive attempts
    while (noNewTweetsCounter < 5) {
      // Scroll a bit
      await incrementalScroll(page);

      // Wait longer for content to load and render
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Get all visible tweets
      const visibleTweets = await page.$$('[data-testid="tweet"]');
      console.log(
        `Found ${visibleTweets.length} visible tweets. Processing new ones...`
      );

      // Skip the first tweet (original post)
      const tweetElements = visibleTweets.slice(1);

      // Process only new tweets
      let newTweetsProcessed = 0;

      for (const tweetElement of tweetElements) {
        try {
          const submission = await parseTweetElement(page, tweetElement, false);
          if (!submission || processedTweetIds.has(submission.tweetUrl)) {
            continue;
          }

          processedTweetIds.add(submission.tweetUrl);
          newTweetsProcessed++;
          submissions.push(submission);

          console.log(
            `Found valid submission from ${submission.author} (@${submission.handle}): ${submission.websiteUrl}${
              submission.videoUrl
                ? `, Video: ${submission.videoUrl}`
                : submission.image.includes('ext_tw_video_thumb')
                  ? ', Native X video with poster image'
                  : ''
            }${
              submission.image ? ', Image: Found' : ', Image: Not found'
            }, Votes: ${submission.votes}`
          );
        } catch (err) {
          console.error('Error processing a tweet:', err);
        }
      }

      // Update counters and check if we should continue scrolling
      totalProcessed += newTweetsProcessed;
      console.log(
        `Processed ${newTweetsProcessed} new tweets in this batch. Total: ${totalProcessed}`
      );

      if (newTweetsProcessed === 0) {
        noNewTweetsCounter++;
        console.log(`No new tweets found. Counter: ${noNewTweetsCounter}/5`);

        // If we've had a few failures, try a larger scroll to get past any potential stuck point
        if (noNewTweetsCounter >= 3 && noNewTweetsCounter < 5) {
          console.log('Attempting a larger scroll to find more tweets...');
          await page.evaluate(() => {
            window.scrollBy(0, 3000); // Scroll further down to try to get past any stuck point
          });
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait longer after a big scroll
        }
      } else {
        // Reset counter if we found new tweets
        noNewTweetsCounter = 0;
      }

      // Longer pause between scrolls to allow all content to load
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    console.log(
      `Finished processing tweets. Found ${submissions.length} valid submissions.`
    );

    return submissions;
  } catch (error) {
    console.error('Fatal error during scraping:', error);
    return [];
  } finally {
    await page?.close();
  }
}

// Helper function for incremental scrolling
async function incrementalScroll(page: Page): Promise<void> {
  // Check if we've reached the bottom of the page
  const isAtBottom = await page.evaluate(() => {
    return (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 500
    );
  });

  // If we're at the bottom, try to trigger Twitter to load more content
  if (isAtBottom) {
    console.log(
      'Reached bottom of page, trying to trigger more content loading...'
    );

    // Try a small scroll up and down to trigger Twitter's infinite scrolling
    await page.evaluate(() => {
      window.scrollBy(0, -200); // Scroll up a bit
    });

    // Wait a moment and then scroll back down
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await page.evaluate(() => {
      window.scrollBy(0, 300); // Scroll down a bit more to trigger loading
    });

    // Wait longer to allow Twitter to load more content
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }

  // Standard scroll
  await page.evaluate(() => {
    const distance = 600; // Smaller scrolls to avoid missing content
    window.scrollBy(0, distance);
  });

  // Wait longer for content to load
  await new Promise((resolve) => setTimeout(resolve, 2500));
}

// Original auto scroll function is kept but no longer used
async function _autoScroll(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        // Stop scrolling after reaching the bottom or loading a lot of content
        if (
          totalHeight >= scrollHeight - window.innerHeight ||
          totalHeight > 50000
        ) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  // Wait a bit after scrolling to ensure content is loaded
  await new Promise((resolve) => setTimeout(resolve, 2000));
}

/**
 * Writes the submissions to the Supabase "projects" table
 */
async function writeSubmissionsToSupabase(
  submissions: Submission[]
): Promise<void> {
  console.log('Writing submissions to Supabase...');

  // Filter out any submissions without either a website URL, a video URL, or an image
  const validSubmissions = submissions.filter(
    (sub) =>
      (sub.websiteUrl && sub.websiteUrl.trim() !== '') ||
      (sub.videoUrl && sub.videoUrl.trim() !== '') ||
      (sub.image && sub.image.trim() !== '')
  );

  if (validSubmissions.length < submissions.length) {
    console.log(
      `Filtered out ${submissions.length - validSubmissions.length} submissions without website URLs, videos or images`
    );
  }

  if (validSubmissions.length === 0) {
    console.log('No valid submissions to insert into Supabase.');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (const submission of validSubmissions) {
    try {
      // Format data for the projects table
      const projectData = {
        author: submission.author,
        image: submission.image, // Use this for both website preview images and video posters
        handle: submission.handle,
        websiteurl: submission.websiteUrl,
        tweeturl: submission.tweetUrl,
        videourl: submission.videoUrl || '', // Will be empty for native X videos
        votes: submission.votes,
        created_at: submission.created_at,
      };

      // Insert data into the projects table
      const { error } = await supabase.from('projects').upsert(projectData, {
        onConflict: 'tweeturl', // Using tweeturl as the unique identifier
        ignoreDuplicates: false, // Update if exists
      });

      if (error) {
        console.error(
          `Error inserting submission from ${submission.handle}:`,
          error
        );
        errorCount++;
      } else {
        console.log(
          `Successfully inserted submission from ${submission.handle}`
        );
        successCount++;
      }
    } catch (error) {
      console.error(`Error processing submission for Supabase:`, error);
      errorCount++;
    }
  }

  console.log(
    `Supabase insertion complete: ${successCount} succeeded, ${errorCount} failed`
  );
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
