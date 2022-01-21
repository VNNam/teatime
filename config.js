require('dotenv').config();

module.exports = {
  SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
  DB_CONNECTION: process.env.DB_CONNECTION,
  DB_NAME: process.env.DB_NAME,
  USER: process.env.USER,
  PWD: process.env.PWD,
  JWT_SECRET: process.env.JWT_SECRET,
  OTP_EXPIRESIN: process.env.OTP_EXPIRESIN,
  JWT_KEY: process.env.JWT_KEY,
};
