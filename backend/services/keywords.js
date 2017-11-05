
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
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error('error inserting keyword to DB', err);
    });
  }

  return {
    getKeywords: getKeywords,
    addKeyword: addKeyword,
  }
}

module.exports = keywordService;
