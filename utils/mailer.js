const { createTransport } = require('nodemailer');
const { USER, PWD } = require('../config');
/**
 * ham gui otp qua email cho nguoi dang ky tai khoan
 *
 * @async
 * @function sendOTP
 * @param {String} otp - doan otp
 * @param {String} email - cua nguoi dang ky
 */
async function sendOTP(otp, email) {
  const tsp = createTransport({
    host: 'Gmail',
    auth: {
      user: USER,
      pass: PWD,
    },
  });
  try {
    await tsp.verify();
    await tsp.sendMail({
      from: USER,
      to: email,
      subject: 'Active account OTP',
      html: `<h1>Your activation code</h1><p><b>${otp}</b></p>`,
    });
  } catch (error) {
    console.log('Has error on sending otp: ', err);
  }
}

module.exports = { sendOTP };
