const _ = require('lodash');

const productServices = (knex) => {

  // add filter parameters later
  function getProducts() {
    return knex('products')
      .then((result) => result)
      .catch((err) => console.error('error fetching products', err));
  }

  function upsertProducts(products = []) {
    const itemIds = [];
    products.forEach((product) => itemIds.push(_.get(product, 'itemId', 0)));

    if (products.length) {
      return knex('products')
      .whereIn('itemId', itemIds)
      .del()
      .then(() => {
        return knex('products').insert(products);
      })
      .then((result) => {
        console.log('successfully added products', result);
      })
      .catch((err) => console.log('error inserting products', err));
    }
  }

  return {
    getProducts: getProducts,
    upsertProducts: upsertProducts,
  }
}


module.exports = productServices;
