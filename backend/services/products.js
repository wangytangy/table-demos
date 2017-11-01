const productServices = (knex) => {


  function insertProducts(products = []) {
    return fetch('/products', { method: 'POST', body: JSON.stringify(products)})
      .then(res => res.json())
      .catch(err => console.error('error inserting products: ', err));
  }

  return {
    insertProducts: insertProducts;
  }
}


module.exports = productServices;
