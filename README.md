Walmart API

## Getting Started

Follow the instructions to setup and run the Walmart API tool on http://localhost:3000:

1) NPM install - Frontend
  - [ ] `cd` into `/walmart_api`
  - [ ] Run `npm install`

2) Database setup
  - [ ] Make sure POSTGRES is installed on your computer
  - [ ] Run `gulp migrate:createdb` to create database pointing to localhost:3000
  - [ ] Run `gulp migrate:latest` to run migrations

3) NPM install - Backend
  - [ ] In another terminal tab, `cd` into `/walmart_api/backend`
  - [ ] Run  `npm install`
  - [ ] Then run `npm start`
  - [ ] This sets up the backend server which will receive requests from the frontend

4) Start the React development server
  - [ ] Finally, `cd` into `/walmart_api`
  - [ ] Run `npm start`
  - [ ] This sets up the React dev server on `http://localhost:3000` however the `proxy` line in `package.json` specifies that requests will be made to `http://localhost:3001`, the backend server we started running in the previous step

5) Open http://localhost:3000 in Google Chrome to use the app if it hasn't opened already

## How to run locally:
  - [ ] Follow all instructions under `Getting Started`

  #### Debugging the server:
    - Use Node version `7.10.1` (node-inspector has trouble attaching debuggers with other versions of Node)
    - In `/walmart_api/backend`, run `npm run debug-start`
    - In Google Chrome, type in `about:inspect`
    - Click on `Open dedicated DevTools for Node`
    - In `Sources` tab, search for files and set your breakpoints!
