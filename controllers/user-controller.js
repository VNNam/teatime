const { users } = require('../database');
exports.login = async () => {
  throw new Error('Not implemented!');
};

exports.logout = () => {
  throw new Error('Not implemented!');
};
exports.register = async () => {
  await users.activeUser();
};
exports.activate = () => {
  throw new Error('Not implemented!');
};
exports.index = () => {
  throw new Error('Not implemented yet!');
};
