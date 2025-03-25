# Detect the operating system
OS := $(shell uname -s)

# Define the Chrome command based on OS
ifeq ($(OS),Linux)
		CHROME_CMD = google-chrome --remote-debugging-port=7572
else ifeq ($(OS),Darwin)  # Darwin is the macOS kernel name
		CHROME_CMD = open -a "Google Chrome" --args --remote-debugging-port=7572
else
		# Windows fallback
		CHROME_CMD = start chrome --remote-debugging-port=7572
endif

# Target to open Chrome
chrome:
	$(CHROME_CMD)

judges:
	./node_modules/.bin/env-cmd ./node_modules/.bin/tsx src/judges.ts

submissions:
	./node_modules/.bin/env-cmd ./node_modules/.bin/tsx src/website-submissions.ts

individual-submissions:
	./node_modules/.bin/env-cmd ./node_modules/.bin/tsx src/website-submissions.ts --individual

.PHONY: chrome judges submissions individual-submissions