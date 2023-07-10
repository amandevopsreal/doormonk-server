const db = require('knex')({
    client: 'pg',
    connection: process.env.DBConfigLink,
    searchPath: ['knex', 'public'],
});
module.exports = db;