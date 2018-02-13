## Getting Started

Follow the instructions to setup and run the Walmart API tool on http://localhost:3000:

1) NPM install - Frontend
  - [ ] **Make sure Node version 6.2.0 or higher is installed on your computer**
  - [ ] `cd` into `/walmart_api`
  - [ ] Run `npm install`

4) Start the React development server
  - [ ] Finally, `cd` into `/walmart_api`
  - [ ] Run `npm start`
  - [ ] This sets up the React dev server on **http://localhost:3000**.
    - The `proxy` line in `/walmart_api/package.json` specifies that requests will be made to http<span></span>://localhost:3001 which points to the backend server we started running in the previous step

5) Open http://localhost:3000 in **Google Chrome** to use the app if it hasn't opened already

## How to run locally:
  - Follow all instructions under `Getting Started`
  - Open project in your text editor
  - Changes to frontend files should trigger an auto-reload

  #### Running Gulp to compile Sass:
  - While in `/walmart_api`, run `gulp` in the terminal
  - Gulp will automatically listen for changes in `*.scss` files and compile the changes

  #### Debugging the server:
  - IF you want to debug the server, use Node version **7.10.1** (**node-inspector** has trouble attaching debuggers with other versions of Node)
  - While in `/walmart_api/backend`, run `npm run debug-start` in the terminal
  - In Google Chrome, type in **"about:inspect"** in address bar
  - Click on `Open dedicated DevTools for Node`
  - In **Sources** tab, search for files and set your breakpoints!

## Technologies Used
  - Postgres
  - Node.js + Express
  - Knex.js
  - Gulp
  - React
  - Material UI (React component library)
