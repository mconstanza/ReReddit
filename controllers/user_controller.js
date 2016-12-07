// Dependencies

var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
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
    failureFlash: false
}));

//=============================================
// LOGIN
//=============================================
router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: false
}));

module.exports = router;
