export function getUsers() {
  return fetch('/users')
    .then(res => res.json());
}

export function getProducts() {
  return fetch('/products')
    .then(res => res.json())
    .catch(err => console.error('error fetching products: ', err));
}
