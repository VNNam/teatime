var express = require('express');
const { index } = require('../controllers/user-controller');

var router = express.Router();

/* GET users listing. */
router.get('/', index);

module.exports = router;
