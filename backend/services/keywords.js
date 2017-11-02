
const keywordService = (knex) => {

  function getKeywords() {
    return knex('keywords').select('*').then((result) => {
      return result;
    });
  }

  return {
    getKeywords: getKeywords,
  }
}

module.exports = keywordService;
