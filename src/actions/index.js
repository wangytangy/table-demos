export function getProducts() {
  return fetch('/products')
    .then(res => res.json())
    .catch(err => console.error('error fetching products: ', err));
}
