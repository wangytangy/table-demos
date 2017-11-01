var express = require('express');
var router = express.Router();

const config = require('../../knexfile'),
      env    = 'development',
      knex   = require('knex')(config[env]);

router.get('/', function(req, res, next) {
  console.log('[keywords router] GET request');
  return knex('keywords')
    .then((result) => res.send(result));
});

module.exports = router;
