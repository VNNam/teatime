const { random } = require('lodash');
/**
 * ham tao chuoi otp gom cac so tu o->9 khong trung nhau, mac dinh la 6 chu so
 *
 * @param {number} max - @default max=6 - do dai cua chuoi otp
 * @returns chuoi otp
 */
const otpGenerator = (max = 6) => {
  if (max < 1 || max > 10) return undefined;
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let otp = '';
  for (let i = 0; i < max; i++) {
    otp = otp.concat(numbers.splice(random(numbers.length - 1), 1)[0]);
  }
  return otp;
};
module.exports = { otpGenerator };
