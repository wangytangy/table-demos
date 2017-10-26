const config = require('../../knexfile'),
      env    = 'development',
      knex   = require('knex')(config[env]);

module.exports = knex;

knex.migrate.latest('config');
