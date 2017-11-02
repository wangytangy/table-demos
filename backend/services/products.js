const productServices = (knex) => {

  // add filter parameters later
  function getProducts() {
    return knex('products')
      .then((result) => result)
      .catch((err) => console.error('error fetching products', err));
  }

  function insertProducts(products = []) {
    
    if (products.length) {
      return knex('products').insert(products);
    }
  }

  return {
    getProducts: getProducts,
    insertProducts: insertProducts,
  }
}


module.exports = productServices;
