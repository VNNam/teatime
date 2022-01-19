const { Message, UserGroup, User, Group } = require('./schema');
const { DB_CONNECTION, DB_NAME } = require('../config');
const mongoose = require('mongoose');
const users = require('./user');
const groups = require('./group');
const messages = require('./message');
/**
 * ket noi den mongodb va cac ham thao tac tren collections
 *
 * @returns users, groups, usergroups, messages
 */
async function teatimedb() {
  try {
    const db = await mongoose.connect(DB_CONNECTION, { dbName: DB_NAME });
    return { users, groups, messages };
  } catch (error) {
    return console.log(error);
  }
}
module.exports = { teatimedb };
