var express = require('express');
var router = express.Router();

const config = require('../../knexfile'),
      env    = 'development',
      knex   = require('knex')(config[env]);

const keywordService = require('../services/keywords')(knex);

router.get('/', function(req, res, next) {
  return keywordService.getKeywords()
    .then((keywords) => {
      const keywordNames = keywords.map((keyword) => keyword.name);
      return keywordNames;
    })
    .then((keywordNames) => {
      // make walmart API call

    });
});

module.exports = router;
