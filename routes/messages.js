var express = require('express');
const { getGroupMessage } = require('../controllers/message-controller');
var router = express.Router();

router.get('/:id', getGroupMessage);

module.exports = router;
