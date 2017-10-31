function fetchWalmartProducts({start = 1, searchTerm = '', numItems = 25} = {}) {
  const API_KEY = 'svfdzspqj5rc8teu2g6d39c2';

  // circumvent the CORS issue with proxy server: "cors-anywhere" app
  const url = `http://cors-anywhere.herokuapp.com/http://api.walmartlabs.com/v1/search?apiKey=${API_KEY}&query=${searchTerm}&numItems=${numItems}&start=${start}`;

  return fetch(url, { method: 'GET'})
  .then((res) => res.json())
  .then((data) => {
    if (data.errors) {
      console.error(data.errors[0]);
    } else {
      console.log(data);
      return data;
    }
  })
  .catch((err) => {
    console.error('error searching Walmart API', err);
  });
}


function insertProducts(products = []) {
  return fetch('/products', { method: 'POST', body: JSON.stringify(products)})
    .then(res => res.json())
    .catch(err => console.error('error inserting products: ', err));
}
