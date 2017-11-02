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
      const APICalls = [];
      keywordNames.forEach((keyword) => {
        APICalls.push(searchWalmartAPI({searchTerm: keyword}));
      });

      return Promise.all(APICalls)
        .then((results) => {
          debugger
          console.log('walmart api results', results);
        })
    })
    .catch(err => console.error('error fetching populating DB: ', err));
}

function searchWalmartAPI({start = 1, searchTerm = '', numItems = 25} = {}) {
  const API_KEY = 'svfdzspqj5rc8teu2g6d39c2';

  // circumvent the CORS issue with proxy server: "cors-anywhere" app
  const url = `http://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?apiKey=${API_KEY}&query=${searchTerm}&numItems=${numItems}&start=${start}`;

  return fetch(url)
  .then((results) => {
    return results.json();
  })
  .catch((err) => console.error('error searching Walmart API', err));
}
