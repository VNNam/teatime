const { DB_CONNECTION, DB_NAME } = require('../config');
const mongoose = require('mongoose');
const users = require('./user');
const groups = require('./group');
const messages = require('./message');
const lockedTokens = require('./lockToken');
/**
 * ket noi den mongodb
 *
 * @returns db
 */
async function teatimedb_connect() {
  try {
    const db = await mongoose.connect(DB_CONNECTION, { dbName: DB_NAME });
    return db;
  } catch (error) {
    return console.log(error);
  }
}

module.exports = { teatimedb_connect, users, groups, messages, lockedTokens };
