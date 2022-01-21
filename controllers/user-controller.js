const { users } = require('../database');
exports.login = async () => {
  throw new Error('Not implemented!');
};

exports.logout = () => {
  throw new Error('Not implemented!');
};
exports.register = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password)
    return next(new Error('Fields cannot empty'));
  try {
    const { error, user } = await users.createUser(email, fullName, password);
    if (error) next(error);
    else {
      const { updatedUser, error } = await users.updateUser(
        { email: user.email },
        { online: true }
      );
      console.log(updatedUser);
    }
  } catch (error) {
    return next(error);
  }
};
exports.activate = () => {
  throw new Error('Not implemented!');
};
exports.index = () => {
  throw new Error('Not implemented yet!');
};
