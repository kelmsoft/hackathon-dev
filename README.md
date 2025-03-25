# hackathon.dev

## Overview

This is a submission for the bolt.new hackathon website challenge posted at https://x.com/boltdotnew/status/1902102762151875053.

The project is published at: https://marvelous-klepon-d0e6c3.netlify.app
You can view all submissions at https://marvelous-klepon-d0e6c3.netlify.app/#/concepts

## Running the Web App

Follow these steps to run the web application:

1. **Install Dependencies**:
   First, ensure Node.js is installed. Then install the project dependencies:

   ```bash
   npm install
   ```

2. **Start the Development Server**:
   Launch the development server:

   ```bash
   npm run dev
   ```

   The web app will be available at `http://localhost:3000` in your browser.

3. **Build for Production**:
   To create a production build:

   ```bash
   npm run build
   ```

   This generates production-ready files in the `dist` directory.

## Running the Scripts in `src/scripts`

The project includes several utility scripts in the `src/scripts` directory:

1. **Judges Script**:
   Fetches and updates judge profile images and information:

   ```bash
   npm run judges
   ```

2. **Website Submissions Script**:
   Processes website submissions in two modes:

   ```bash
   # Thread mode
   npm run submissions

   # Individual mode
   npm run individual-submissions
   ```

   Before running it, quit chrome and relaunch it with the remote debugging port open:

   ```bash
   google-chrome --remote-debugging-port=7572 # linux
   open -a "Google Chrome" --args --remote-debugging-port=7572 # macos
   start chrome --remote-debugging-port=7572 # windows
   ```

## Project Setup

- **Environment Variables**: Create a `.env` file based on `.env.sample` with your configuration. Check `.gitignore` to ensure sensitive information isn't committed.

- **Dependencies**: Review the dependencies in `package.json` for a complete list of project requirements.

- **Makefile Shortcuts**: Use these commands for quick access:
  - `make www`: Run the web app
  - `make chrome`: Open in Chrome
  - `make judges`: Run judges script
  - `make submissions`: Run submissions script
  - `make individual-submissions`: Run individual submissions script

For detailed information about each script's functionality, refer to the documentation within the script files.
