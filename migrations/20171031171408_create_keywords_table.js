
exports.up = function(knex, Promise) {
  return createKeywordsTable(knex, Promise)
  .then(() => insertDefaultKeywords(knex, Promise));
};

exports.down = function(knex, Promise) {
  return dropProductsTable(knex, Promise);
};

function createKeywordsTable(knex, Promise) {
  return knex.schema.createTable('keywords', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.timestamps(false, true);
 });
}

function dropProductsTable(knex, Promise) {
  return knex.schema.dropTable('products');
}

function insertDefaultKeywords(knex, Promise) {
  return knex('keywords').insert([
    { name: 'cereal'},
    { name: 'cold cereal'},
  ])
}
