import { aggregateWalmartItems, sanitizeWalmartItems } from './utils';

export function fetchKeywords() {
  return fetch('/keywords', { headers: { 'content-type': 'application/json' }})
    .then((data) => data.json())
    .catch((err) => console.error('error fetching products: ', err));
}

export function addKeyword(keyword) {
  if (!keyword) return Promise.resolve();

  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
  const request = new Request('/keywords', {
    method: 'POST',
    body: JSON.stringify({keyword}),
    headers: headers
  });

  return fetch(request)
    .then((result) => {
      console.log('successfully inserted products');
      return Promise.resolve();
    })
    .catch((err) => {
      console.error('error inserting keyword', err);
    })

}

export function populateDB() {
  // step 1: get keywords
  return fetch('/keywords', { headers: { 'content-type': 'application/json' }})
    .then((results) => results.json())
    .then((keywords) => keywords.length ? keywords.map((keyword) => keyword.name) : [])
    .then((keywordNames) => {
      let APICalls = [];
      keywordNames.forEach((keyword) => {
        // step 2: use keywords to prepare Walmart Search requests
        // for now just fetch 1 page of results (25 items) for each keyword
        APICalls = APICalls.concat(getWalmartSearchRequests({
          searchTerm: keyword,
          numPages: 1,
          numItems: 10
        }));
      });

      // fire off search requests
      return Promise.all(APICalls)
        .then((searchResults) => searchResults)
        .catch((err) => console.error('Walmart API error', err));
    })
    .then((searchResults) => {
      const allItems = aggregateWalmartItems({searchResults, path: 'items'});
      const itemsToInsert = sanitizeWalmartItems(allItems);
      return itemsToInsert;
    })
    .then((itemsToInsert) => {
      // step 3: Insert Walmart Search results into our DB
      const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
      const request = new Request('/products', {
        method: 'POST',
        body: JSON.stringify(itemsToInsert),
        headers: headers
      });

      return fetch(request)
        .then(() => {
          console.log('successfully inserted products');
          return Promise.resolve();
        })
        .catch((err) => console.error('error inserting products', err));
    })
    .catch(err => console.error('error fetching populating DB: ', err));
}

export function getWalmartSearchRequests(
  {
    start = 1,
    searchTerm = '',
    numItems = 10,
    numPages = 1} = {} // defaults
) {
  const API_KEY = 'svfdzspqj5rc8teu2g6d39c2';
  const APICalls = []

  for (let start = 1; start <= numPages; start++) {
    // circumvent the CORS issue with proxy server: "cors-anywhere" app
    // or install chrome 'allow cors' extension
    const url = `http://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?apiKey=${API_KEY}&query=${searchTerm}&numItems=${numItems}&start=${start}`;
    APICalls.push(
      fetch(url)
      .then((results) => {
        if (results.ok) {
          return results.json();
        } else {
          return { items: [] };
        }
      })
      .catch((err) => console.error('error searching Walmart API', err))
    );
  }
  // return an array of API calls in case we want multiple pages of results
  return APICalls;
}
