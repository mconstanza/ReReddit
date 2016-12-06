// Dependencies

var express = require('express');
// var models = require('../models');
var passport = require('passport');

// create the express router
var router = express.Router();

router.get('/articles', function(req, res) {
  res.send('You logged in!');
});








module.exports = router;
