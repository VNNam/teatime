var express = require('express');
const {
  index,
  register,
  addFollower,
  activate,
} = require('../controllers/user-controller');

var router = express.Router();

/* GET users listing. */
router.get('/', index);
router.get('/register', (req, res) => {
  res.send('<h1>Register a user page</h1>');
});
router.post('/register', register);
router.get('/activation', (req, res) => {
  console.log(req.email);
  res.send(req.email);
});
router.post('/activation', activate);

router.post('/followers', addFollower);
module.exports = router;
