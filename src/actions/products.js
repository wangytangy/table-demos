export function getProducts() {
  console.log('fetching products');
  return fetch('/products', { headers: { 'content-type': 'application/json' }})
    .then((data) => {
      return data.json();
    })
    .catch((err) => console.error('error fetching products: ', err));
}
