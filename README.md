# Bruce's Walmart API

This application allows users to add `keyword` search terms to a persistent database. These keywords are then used to search products using the [Walmart Search API](https://developer.walmartlabs.com/docs/read/Search_API), store them in a database, and display them in **searchable**, **sortable**, **edit-able** table.

![app image](https://github.com/wangytangy/walmart_api/blob/master/src/assets/preview.jpg)

## Getting Started

Follow the instructions to setup and run the Walmart API tool on http://localhost:3000:

1) NPM install - Frontend
  - [ ] `cd` into `/walmart_api`
  - [ ] Run `npm install`

2) Database setup
  - [ ] **Make sure POSTGRES is installed on your computer**
  - [ ] Run `gulp migrate:createdb` to create database pointing to localhost:3000
  - [ ] Run `gulp migrate:latest` to run migrations

3) NPM install - Backend
  - [ ] In another terminal tab, `cd` into `/walmart_api/backend`
  - [ ] Run `npm install`
  - [ ] Then run `npm start`
  - [ ] This sets up the backend server which will receive requests from the frontend

4) Start the React development server
  - [ ] Finally, `cd` into `/walmart_api`
  - [ ] Run `npm start`
  - [ ] This sets up the React dev server on **http://localhost:3000**.
    - The `proxy` line in `/walmart_api/package.json` specifies that requests will be made to http<span></span>://localhost:3001 which points to the backend server we started running in the previous step

5) Open http://localhost:3000 in **Google Chrome** to use the app if it hasn't opened already

#### 6) _IMPORTANT_: Avoiding the CORS issue
  - The app should automatically enable cross-origin requests from anywhere using the **cors-anywhere** proxy: https://cors-anywhere.herokuapp.com/
  - However if the proxy is down, install the [**Allow-Control-Allow-Origin**](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) Chrome extension and turn it on.

## Background

This Walmart data collection tool works by automatically picking up all keywords stored in its database and querying the Walmart Search API, **fetching 10 products** per keyword.

Users may add up keywords (up to a **maximum of 5 keywords**). Upon adding keywords, the system will automatically populate the database with relevant Walmart products. These constraints exist to avoid triggering an error on Walmart's API which limits anyone from making more than 5 queries/second. Users may also delete keywords and add new ones.

This application is created with a React frontend without Redux due to its limited scope, time constraints, and relatively simple data flow. Requests are handled with an Express server coupled with the Knex.js library to handle SQL queries.

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

## Additional Features
  The following features would improve UI functionality and add business value to the data collection tool.

  1. Ideally I would've like to deploy the application on **Heroku** to avoid lengthy setup
  2. **Pagination** - Implement pagination to break down requests to smaller packets of data (using `react-paginate` library)
    - `limit` each GET request to 25 items per page
    - pass a `skip` parameter to offset SELECT query
    - aggregate a `total_count` of all products to calculate total number of pages
  3. **Refactor Walmart Search API functions** to a **service worker** so UI is not blocked while database is waiting to be populated with products
  4. **Loading circle** - signal to the user the UI is loading

## Technologies Used
  - Postgres
  - Node.js + Express
  - Knex.js
  - Gulp
  - React
  - Material UI (React component library)
