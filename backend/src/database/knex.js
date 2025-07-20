const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile')[environment];
const knex = require('knex')(config);

// Exporta a instância do Knex para ser usada em outros módulos
module.exports = knex;