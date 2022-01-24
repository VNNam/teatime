const { users } = require('../database');
const { sendOTP } = require('../utils/mailer');
const { otpGenerator } = require('../utils/randomOTP');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const {token, error} = await users.authenticate(email, password);
    if(!token) throw error;
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
    if (error) throw new Error(error.message);
    // return next({ user, error });
    const otp = otpGenerator();
    await users.setOTP(user._id, otp);
    await sendOTP(otp, email);
    req.email = email;
    res.redirect('activation');
  } catch (error) {
    return next(error);
  }
};
exports.activate = async (req, res, next) => {
  const { email } = req;
  const { otp } = req.body;

  try {
    const { activedUser, error } = await users.activeUser(email, otp);
    res.json(activedUser ?? error);
  } catch (error) {
    return next(error);
  }
};
exports.addFollower = async (req, res, next) => {
  const { userId, followerId } = req.body;
  try {
    const { user, error } = await users.addFollower(userId, followerId);
    res.json(user ?? error.message);
  } catch (error) {
    res.json(error);
  }
};
exports.index = () => {
  throw new Error('Not implemented yet!');
};
