Walmart API

Getting Started


1) NPM install instructions
    - `cd` into `/walmart_api`
    - run `npm install`

2) Database setup
    - make sure POSTGRES is installed on your computer
    - run `gulp migrate:createdb` to create database pointing to localhost:3000
    - run `gulp migrate:latest` to run migrations

3) Start the Express server
    - `cd` into `/walmart_api/backend`
    - run  `npm install`
    - run `npm start`
    - this sets up the backend server which will receive requests from the front-end Javascript code
    - the server is running on http://localhost:3001


4) Start the React development server
    - In another terminal, `cd` into `/walmart_api`
    - run `npm start`
    - this sets up the React dev server on http://localhost:3000 however the `proxy` line in `package.json` specifies that requests will be made to http://localhost:3001, the backend server we started running in the previous step


5) Open http://localhost:3000 in Chrome to use the app if it hasn't opened already
