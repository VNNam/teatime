var express = require('express');
const { index, register } = require('../controllers/user-controller');

var router = express.Router();

/* GET users listing. */
router.get('/', index);
router.post('/register', register);
router.get('/register', (req, res) => {
  res.send('<h1>Register a user page</h1>');
});

module.exports = router;
