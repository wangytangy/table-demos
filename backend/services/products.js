const _ = require('lodash');

const productServices = (knex) => {

  function getProducts(searchTerm = '') {
    if (searchTerm) {
      return knex('products')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .orWhere('categoryPath', 'ILIKE', `%${searchTerm}%`)
        .select()
        .then((result) => {
          return result;
      }).catch((err) => console.error('error fetching products', err));
    } else {
      return knex('products').select('*').then((result) => {
        return result;
      }).catch((err) => console.error('error fetching products', err));
    }

  }

  function upsertProducts(products = []) {
    // we are doing an upsert so we don't add
    // duplicate products each time we refresh the app and populate the DB
    const itemIds = products.map((product) => _.get(product, 'itemId'));

    if (products.length) {
      return knex('products')
      .whereIn('itemId', itemIds).del()
      .then(() => knex('products').insert(products))
      .catch((err) => console.log('error inserting products', err));
    }
  }

  return {
    getProducts: getProducts,
    upsertProducts: upsertProducts,
  }
}


module.exports = productServices;
