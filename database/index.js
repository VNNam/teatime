const { Message, UserGroup, User, Group } = require('./schema');
const { DB_CONNECTION, DB_NAME } = require('../config');
const mongoose = require('mongoose');
const users = require('./user');
const groups = require('./group');
const usergroups = require('./user-group');
const messages = require('./message');

/**
 * Tao ket noi den mongodb
 *
 * @async
 * @function dbConnection
 */
function teatimedb() {
  return mongoose
    .connect(DB_CONNECTION, { dbName: DB_NAME })
    .then((db) => {
      return { users, groups, usergroups, messages };
    })
    .catch((error) => console.log(error));
}
module.exports = { teatimedb };
