const { verifyToken } = require('../utils/token');
const { LockedToken } = require('./schema');

exports.addToBlackList = async (token) => {
  try {
    const { exp } = verifyToken(token);
    const lockedToken = await LockedToken.create({
      token,
      expiresAt: new Date(exp * 1000),
    });
    return { lockedToken };
  } catch (error) {
    return { error };
  }
};
/**
 * check token is locked
 *
 * @param {string} token
 * @returns true or false
 */
exports.isLocked = async (token) => {
  try {
    const token = await LockedToken.findOne({ token }).exec();
    return token ? true : false;
  } catch (error) {
    return false;
  }
};
