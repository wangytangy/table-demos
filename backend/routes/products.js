var express = require('express');
var router = express.Router();

const config = require('../../knexfile'),
      env    = 'development',
      knex   = require('knex')(config[env]);

const productsServices = require('../services/products')(knex);

router.get('/', function(req, res, next) {
  console.log('[products router] GET request');
  productsServices.getProducts()
  .then((result) => {
    res.send(result)
  });
});

router.post('/', function(req, res, next) {
  console.log('[products router] POST request');
  const products = req.body || [];
  productsServices.upsertProducts(products);
});

module.exports = router;
