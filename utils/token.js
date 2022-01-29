const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.createToken = function (info = {}, expiresIn = '1d') {
  return jwt.sign({ ...info }, JWT_SECRET, { expiresIn });
};
exports.verifyToken = function (token) {
  return { ...jwt.verify(token, JWT_SECRET) };
};
