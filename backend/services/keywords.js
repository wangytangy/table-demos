
const keywordService = (knex) => {

  function getKeywords() {
    return knex('keywords').select('*').then((result) => {
      return result;
    });
  }

  function addKeyword(keyword = '') {
    return knex('keywords')
    .where({name: keyword}).del()
    .then(() => knex('keywords').insert({name: keyword}))
    .catch((err) => {
      console.error('error inserting keyword to DB', err);
    });
  }

  function deleteKeyword(id) {
    return knex('keywords').where({id}).del();
  }

  return {
    getKeywords: getKeywords,
    addKeyword: addKeyword,
    deleteKeyword: deleteKeyword,
  }
}

module.exports = keywordService;
