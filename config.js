require('dotenv').config();

module.exports = {
  SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
  DB_CONNECTION: process.env.DB_CONNECTION,
  DB_NAME: process.env.DB_NAME,
  SMTP: process.env.SMTP,
  PASSWORD: process.env.PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  OTP_EXPIRESIN: process.env.OTP_EXPIRESIN,
  JWT_KEY: process.env.JWT_KEY,
};
console.log(process.env.SMTP);
