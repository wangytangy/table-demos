var express = require('express');
var router = express.Router();
const config = require('../../knexfile'),
      env    = 'development',
      knex   = require('knex')(config[env]),
      _      = require('lodash');

const keywordService = require('../services/keywords')(knex);

router.get('/', function(req, res, next) {
  return keywordService.getKeywords().then((keywords) => {
    res.send(keywords);
  });
});

router.post('/', function(req, res, next) {
  console.log('[keywords router] POST request');

  const keyword = req.body.keyword || '';

  return keywordService.addKeyword(keyword).then(() => {
    res.send(Promise.resolve());
  });
});

router.delete('/:id', function(req, res, next) {
  console.log('[keywords router] delete request');

  const id = _.get(req.params, 'id', null);

  return keywordService.deleteKeyword(id).then(() => {
    res.send(Promise.resolve());
  });
});

module.exports = router;
