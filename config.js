require('dotenv').config();

module.exports = {
  BCRYPT_SECRET: process.env.BCRYPT_SECRET,
  DB_CONNECTION: process.env.DB_CONNECTION,
  DB_NAME: process.env.DB_NAME,
};
