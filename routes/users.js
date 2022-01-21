var express = require('express');
const { index, register, login } = require('../controllers/user-controller');

var router = express.Router();

/* GET users listing. */
router.get('/', index);
router.post('/register', register);
router.get('/register', (req, res) => {
  res.send('<h1>Register a user page</h1>');
});

router
  .get('/login', (req, res) => {
    res.send('<h1>View login</h1>');
  })
  .post('/login', login);

module.exports = router;
