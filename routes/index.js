var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test', async (req, res) => {
  res.json(req.body);
});

module.exports = router;
