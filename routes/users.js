var express = require('express');
const {
  groupsOfUser,
  createGroup,
} = require('../controllers/group-controller');
const {
  getGroupMessage,
  createMessage,
} = require('../controllers/message-controller');
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
  isActivated,
  generateOTP,
  logout,
  search,
} = require('../controllers/user-controller');

var router = express.Router();

/* GET users listing. */
router.get('/', userAuthenticated, index);
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', isActivated, login);
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
router.get('/otp', generateOTP);
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
router.post('/logout', logout);

router.get('/:id/groups', groupsOfUser);
router.post('/:id/groups', createGroup);

router.get('/:userId/groups/:gId', getGroupMessage);
router.post('/:userId/groups/:gId', createMessage);

router.post('/:id/followers', addFollower);

router.post('/followers', addFollower);
router.get('/search', search);
module.exports = router;
