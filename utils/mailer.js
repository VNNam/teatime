const { createTransport } = require('nodemailer');
const { SMTP, PASSWORD } = require('../config');
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
    service: 'Gmail',
    auth: {
      user: SMTP,
      pass: PASSWORD,
    },
  });
  try {
    await tsp.verify();
    await tsp.sendMail({
      from: SMTP,
      to: email,
      subject: 'Active account OTP',
      html: `<div>Your activation code: <h1>${otp
        .split('')
        .join(' ')
        .toString()}</h1></div>`,
    });
  } catch (error) {
    console.log('Has error on sending otp: ', error);
  }
}

module.exports = { sendOTP };
