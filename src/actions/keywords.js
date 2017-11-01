export function populateDB() {
  return fetch('/keywords', { headers: { "Content-Type": "application/json" }})
    .then(res => res.json())
    .then((data) => {
      debugger
      return data;
    })
    .catch(err => console.error('error fetching populating DB: ', err));
}
