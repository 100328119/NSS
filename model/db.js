const settings = require('../config/dbconfig.json');
const qb = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'pool');

module.exports = qb;
