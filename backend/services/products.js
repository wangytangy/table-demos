const _ = require('lodash');

const productServices = (knex) => {

  function getProducts({searchTerm, sort}) {

    let query = knex('products');

    if (searchTerm) {
      query.where('name', 'ILIKE', `%${searchTerm}%`)
        .orWhere('categoryPath', 'ILIKE', `%${searchTerm}%`);
    }

    if (sort) {
      query.orderBy(sort.field, sort.order);
    }

    return query.select().then((result) => {
      return result;
    }).catch((err) => console.error('error fetching products', err));
  }

  function upsertProducts(products = []) {
    // we are doing an upsert so we don't add
    // duplicate products each time we refresh the app and populate the DB
    const insertStatements = products.map((p) => {
      return knex('products').where('itemId', p.itemId).select()
        .then((result) => {
          const doesExist = result.length > 0;
          if (!doesExist) {
            return knex('products').insert(p);
          }
        })
        .catch((err) => console.error('error inserting products', err));
    });

    return Promise.all(insertStatements);
  }

  function updateProduct(product) {
    const itemId = _.get(product, 'itemId', null);
    if (!itemId) return Promise.resolve();

    return knex('products').where({itemId: itemId}).update(product)
      .then(() => Promise.resolve())
      .catch((err) => console.error('error updating products', err));
  }

  return {
    getProducts: getProducts,
    upsertProducts: upsertProducts,
    updateProduct: updateProduct,
  }
}



module.exports = productServices;
