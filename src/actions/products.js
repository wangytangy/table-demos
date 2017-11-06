export function getProducts() {
  return fetch('/products', { headers: { 'content-type': 'application/json' }})
    .then((data) => data.json())
    .catch((err) => console.error('error fetching products: ', err));
}

export function searchProducts({searchTerm = '', sort = { order: 'asc', field: 'name'}} = {}) {
  const url = new URL(`${document.location}/products`);

  const params = { query: searchTerm, sort: JSON.stringify(sort)};
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
  const request = new Request(url, {
    method: 'GET',
    headers: headers,
  });

  return fetch(request)
    .then((data) => data.json())
    .catch((err) => console.error('error inserting products', err));
}

export function updateProduct(product) {
  const itemId = product.itemId;

  if (itemId === undefined) {
    console.error('must provide itemId to update product');
    return Promise.resolve();
  }

  const url = new URL(`${document.location}/products/${itemId}`);

  const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};
  const request = new Request(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(product)
  });

  return fetch(request)
    .then((data) => Promise.resolve())
    .catch((err) => console.error('error updating products', err));
}
