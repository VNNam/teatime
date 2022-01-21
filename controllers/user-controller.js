const { users } = require('../database');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await users.getOneUser({ email: email});
    if(!user) throw new Error(`can't found account`);

    if(! await users.hasPassword(password, user.hashedPwd)) 
      throw new Error(`error check decoding password`);

    const token = await users.createToken(user);

    return res
      .cookie("token", token, { maxAge: 900000 })
      .json({ 
        message: "Login success",
        token,
      })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
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
