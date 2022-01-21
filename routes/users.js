var express = require('express');
const {
  index,
  register,
  addFollower,
  activate,
  login
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

router
  .get('/login', (req, res) => {
    res.send('<h1>View login</h1>');
  })
  .post('/login', login);

router.post('/followers', addFollower);
module.exports = router;
