importScripts('worker_tasks.js');

self.addEventListener('install', function(event) {
  console.log('[service worker installed]');
});

self.addEventListener('activate', function(event) {
  console.log('[service worker activated]');

  const promisesToExecute = [];

  for (let i = 1; i < 11; i++) {
    promisesToExecute.push(fetchWalmartProducts({start: i, searchTerm: 'cereal'}))
  }

  Promise.all(promisesToExecute)
  .then((results) => {

    let products = [];

    // forEach through results
    // get array of all items
    results.forEach((query) => {
      if (query.items && query.items.length) {
        products = products.concat(query.items);
      }
    });

  })
});
