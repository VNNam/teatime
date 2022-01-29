var express = require('express');
const {
  index,
  register,
  addFollower,
  activate,
  login,
  userAuthenticated,
  forgotPassword,
  changePassword,
  verifyOTP,
} = require('../controllers/user-controller');

var router = express.Router();

/* GET users listing. */
router.get('/', userAuthenticated, index);
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', login);
router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', register);
router.get('/activate', (req, res) => {
  const { email } = req.session;
  res.render('activation', {
    yourEmail: '***' + email?.substring(3),
  });
});
router.post('/activate', activate);
router.get('/forgot', (req, res) => {
  res.render('forgot-password');
});
router.post('/forgot', forgotPassword);
router.post('/verify-otp', verifyOTP);
router.get('/change-password', (req, res) => {
  res.render('change-password');
});
router.post('/change-password', changePassword);

router.post('/followers', addFollower);
module.exports = router;
