var express = require('express');
var router = express.Router();

const config = require('../../knexfile'),
      env    = 'development',
      knex   = require('knex')(config[env]);

/* GET products listing. */
router.get('/', function(req, res, next) {
  return knex('products')
    .then((result) => res.send(result));
});

module.exports = router;
