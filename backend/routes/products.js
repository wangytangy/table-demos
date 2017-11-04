var express = require('express');
var router = express.Router();

const config = require('../../knexfile'),
      env    = 'development',
      knex   = require('knex')(config[env]),
      _      = require('lodash');

const productsServices = require('../services/products')(knex);

router.get('/', function(req, res, next) {
  console.log('[products router] GET request');

  const searchTerm = _.get(req.query, 'query', '');

  return productsServices.getProducts(searchTerm)
  .then((result) => {
    res.send(result);
  }).catch((err) => console.error('error fetching products', err));
});

router.post('/', function(req, res, next) {
  console.log('[products router] POST request');
  const products = req.body || [];
  return productsServices.upsertProducts(products).then(() => {
    res.send(Promise.resolve());
  });
});

module.exports = router;
