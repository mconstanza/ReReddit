// Dependencies

var express = require('express');
var User = require('../models/User.js');
// var models = require('../models');
var passport = require('passport');
var crypto = require('crypto');

// create the express router
var router = express.Router();

router.get('/', function(req, res) {

});
//=============================================
// SIGNUP
//=============================================
router.get('/signup', function(req, res) {
    res.render('signup');
});

router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/articles/',
    failureRedirect: '/signup/',
    failureFlash: true
}));

//=============================================
// LOGIN
//=============================================
router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('login', {
  successRedirect: 'articles',
  failureRedirect: '/login/',
  failureFlash: true
}));

module.exports = router;
