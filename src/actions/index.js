export function getUsers() {
  return fetch('/users')
    .then(res => res.json())
}
