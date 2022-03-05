const res = require('express/lib/response');
const { users, lockedTokens, groups } = require('../database');
const { User } = require('../database/schema');
const { sendOTP } = require('../utils/mailer');
const { otpGenerator } = require('../utils/randomOTP');
const { verifyToken } = require('../utils/token');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      throw new Error('username & password cannot be empty!');
    const { token, error } = await users.signIn(email, password);
    if (error) throw error;
    res.cookie('token', token);
    res.status(200).redirect('/users');
  } catch (error) {
    res.status(300).render('login', { error });
  }
};
exports.isActivated = async (req, res, next) => {
  const { email } = req.body;
  try {
    const resp = await users.isActivated(email);
    const { error } = resp;
    if (error) throw error;
    if (resp) return next();
    req.session.email = email;
    res.redirect('activate');
  } catch (error) {
    next(error);
  }
};
exports.logout = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    await lockedTokens.addToBlackList(token);
    res.cookie('token', '', { maxAge: 0 });
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};
exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password)
      throw new Error('Fields cannot empty');
    if (password.length < 6)
      throw new Error('password length must greater than 6 characters');
    const { error, user } = await users.createUser(email, fullName, password);
    if (error) throw new Error(error.message);
    const otp = otpGenerator();
    await users.setOTP(user, otp);
    await sendOTP(otp, email);
    req.session.email = email;
    res.redirect('activate');
  } catch (error) {
    return res.render('register', { error });
  }
};
exports.activate = async (req, res, next) => {
  const { email } = req.session;
  const { otp } = req.body;

  try {
    const { activedUser, error } = await users.activeUser(email, otp);
    if (error) throw error;
    res.redirect('login');
  } catch (error) {
    res.render('activation', { error });
  }
};
exports.addFollower = async (req, res, next) => {
  const { userId, followerId } = req.body;
  try {
    const { user, error } = await users.addFollower(userId, followerId);
    res.json(user ? user : error.message);
  } catch (error) {
    res.json(error);
  }
};
exports.userAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token || (await lockedTokens.isLocked(token)))
      next({ notLoggedIn: true });
    else {
      const { username, id, exp } = verifyToken(token);
      next({ username, id });
    }
  } catch (error) {
    next(error);
  }
};
exports.generateOTP = async (req, res, next) => {
  const { email } = req.session;
  console.log(email);
  try {
    const otp = otpGenerator();

    const { updatedUser, error } = await users.setOTP({ email }, otp);
    await sendOTP(otp, email);
    return res.json(updatedUser ? updatedUser : error);
  } catch (error) {
    return res.json(error);
  }
};
exports.index = async (data, req, res, next) => {
  const { username, id, notLoggedIn } = await data;
  console.log(username, '/', id);
  if (notLoggedIn) return res.redirect('users/login');
  try {
    const { userGroups, error } = await groups.getGroupsOfUser(id);
    console.log(userGroups, '/', error);

    res.render('user-page', {
      user: { id, username },
      groups: userGroups ? userGroups : [],
      error,
    });
  } catch (error) {
    return next(error);
  }
};
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const otp = otpGenerator();
    const { updatedUser, error } = await users.setOTP({ email }, otp);
    if (error) throw error;
    await sendOTP(otp, email);
    req.session.email = email;
    res.render('forgot-password', { email });
  } catch (error) {
    res.render('forgot-password', { error });
  }
};
exports.verifyOTP = async (req, res, next) => {
  const { otp } = req.body;
  const { email } = req.session;
  try {
    const verifyOTP = await users.verifyOTP(email, otp);
    if (verifyOTP.error) throw new Error(verifyOTP.error.message);
    if (!verifyOTP) throw new Error('OTP does not match!');
    res.redirect('change-password');
  } catch (error) {
    res.render('forgot-password', { error, email });
  }
};
exports.changePassword = async (req, res, next) => {
  const { newPassword } = req.body;
  const { email } = req.session;
  try {
    const { updatedUser, error } = await users.updatePassword(
      email,
      newPassword
    );
    if (error) throw error;
    res.render('change-password', { email });
  } catch (error) {
    res.render('change-password', { error });
  }
};

exports.search = async (req, res) => {
  const { key } = req.query;
  try {
    const listUser = await users.searchKey(key);
    return res.json({ listUser });
  } catch (error) {
    return res.json(error);
  }
};
