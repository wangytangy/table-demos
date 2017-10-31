var express = require('express');
var router = express.Router();

const config = require('../../knexfile'),
      env    = 'development',
      knex   = require('knex')(config[env]);

router.get('/', function(req, res, next) {
  console.log('[products router] GET request');
  return knex('products')
    .then((result) => res.send(result));
});

router.post('/', function(req, res, next) {
  console.log('[products router] POST request: ', req.body);
  debugger
  return Promise.resolve();
})

module.exports = router;
