const { Message, UserGroup, User, Group } = require('./schema');
const { DB_CONNECTION, DB_NAME } = require('../config');
const mongoose = require('mongoose');
const users = require('./user');

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
      return { users };
    })
    .catch((error) => console.log(error));
}
teatimedb();
module.exports = { teatimedb };
