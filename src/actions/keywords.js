import { aggregateWalmartItems } from './utils';

export function populateDB() {
  return fetch('/keywords', { headers: { 'content-type': 'application/json' }})
    .then((results) => {
      return results.json();
    })
    .then((keywords) => {
      const keywordNames = keywords.map((keyword) => keyword.name);
      return keywordNames;
    })
    .then((keywordNames) => {
      let APICalls = [];
      keywordNames.forEach((keyword) => {
        // for now just fetch 1 page of results (25 items) for each keyword
        APICalls = APICalls.concat(searchWalmartAPI({searchTerm: keyword, numPages: 2}));
      });

      return Promise.all(APICalls)
        .then((searchResults) => {
            console.log('walmart api results', searchResults);
          return searchResults;
        })
    })
    .then((searchResults) => {
      const allItems = aggregateWalmartItems({searchResults, path: 'items'});
      console.log('aggreated items', allItems);
    })
    .catch(err => console.error('error fetching populating DB: ', err));
}

export function searchWalmartAPI({start = 1, searchTerm = '', numItems = 25, numPages = 1} = {}) {
  const API_KEY = 'svfdzspqj5rc8teu2g6d39c2';

  const APICalls = []

  for (let start = 1; start <= numPages; start++) {
    // circumvent the CORS issue with proxy server: "cors-anywhere" app
    const url = `http://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?apiKey=${API_KEY}&query=${searchTerm}&numItems=${numItems}&start=${start}`;
    APICalls.push(
      fetch(url).then((results) => results.json()).catch((err) => console.error('error searching Walmart API', err))
    );
  }
  // return an array of API calls in case we want multiple pages of results
  return APICalls;
}
