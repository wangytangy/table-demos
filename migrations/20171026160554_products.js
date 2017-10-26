
exports.up = function(knex, Promise) {
  return createProductsTable(knex, Promise);
};

exports.down = function(knex, Promise) {
  return dropProductsTable(knex, Promise);
};

function createProductsTable(knex, Promise) {
  return knex.schema.createTable('products', function(table) {
    table.increments('uid').primary();
    table.string('name');
    table.timestamps();
 });
}

function dropProductsTable(knex, Promise) {
  return knex.schema.dropTable('products');
}
