importScripts('worker_tasks.js');

self.addEventListener('install', function(event) {
  console.log('[service worker installed]');
});

self.addEventListener('activate', function(event) {
  console.log('[service worker activated]');

  const promisesToExecute = [];

  for (let i = 1; i < 11; i++) {
    promisesToExecute.push(getProducts({start: i, searchTerm: 'cereal'}))
  }

  Promise.all(promisesToExecute)
  .then((result) => {
    debugger
    // forEach through results
    // get items
    // put them in knex insert statement
    // promise.all(knex inserts)
  })
});

self.addEventListener('fetch', function(event) {
  console.log('[service worker fetching]', event.request.url);
});
