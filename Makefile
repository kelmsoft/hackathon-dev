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

www:
	@npm run dev -- --port 3636

# Target to open Chrome
chrome:
	$(CHROME_CMD)

judges:
	npm run judges

submissions:
	npm run submissions

individual-submissions:
	npm run individual-submissions

.PHONY: www chrome judges submissions individual-submissions