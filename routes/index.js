var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki');
var userRouter = require('./user');
// var models = require('../models');

router.get('/', function(req, res) {
  res.send('Hello');
});

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

module.exports = router;
