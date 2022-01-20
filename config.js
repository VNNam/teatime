require('dotenv').config();

module.exports = {
  BCRYPT_SALT: process.env.BCRYPT_SALT,
  DB_CONNECTION: process.env.DB_CONNECTION,
  DB_NAME: process.env.DB_NAME,
  USER: process.env.USER,
  PWD: process.env.PWD,
  JWT_SECRET: process.env.JWT_SECRET,
};
