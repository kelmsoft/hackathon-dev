import fs from 'fs/promises';
import path from 'path';

import fetch from 'cross-fetch';
import { JUDGES } from '@/constants';

const JUDGES_DIR = 'public/judges';

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function main() {
  await fs.mkdir(JUDGES_DIR, { recursive: true });

  console.log('Fetching profile images for judges...');

  // Process each judge in parallel
  await Promise.all(
    JUDGES.map(async (judge) => {
      const handle = judge.handle.replace('@', '');
      const imagePath = path.join(JUDGES_DIR, `${handle}.jpg`);

      // Skip if image already exists
      try {
        await fs.access(imagePath);
        console.log(`Image for ${judge.name} already exists at ${imagePath}`);
        return;
      } catch (err) {
        // Image doesn't exist, continue to fetch
      }

      try {
        // Use Twitter API to fetch profile image
        // Note: Twitter API requires authentication which we're simulating here
        // In a real implementation, you would need to use the Twitter API with proper auth
        // This is a simplified example that uses scraping which may not be reliable

        const twitterUrl = `https://unavatar.io/twitter/${handle}`;
        console.log(`Fetching image for ${judge.name} from ${twitterUrl}`);

        const response = await fetch(twitterUrl);
        const data = await response.arrayBuffer();
        await fs.writeFile(imagePath, Buffer.from(data));

        console.log(
          `Successfully saved image for ${judge.name} to ${imagePath}`
        );
      } catch (error) {
        console.error(
          `Failed to fetch image for ${judge.name}:`,
          error instanceof Error ? error.message : String(error)
        );
      }
    })
  );

  console.log('Updating JUDGES with new image URLs...');

  // Update JUDGES with new image URLs
  const updatedJudges = JUDGES.map((judge) => {
    const handle = judge.handle.replace('@', '');
    return {
      ...judge,
      imageUrl: `/judges/${handle}.jpg`,
    };
  });

  console.log('Done!');
  console.log('Updated JUDGES object:', JSON.stringify(updatedJudges, null, 2));

  // Here you could write the updated JUDGES back to a file if needed
}
