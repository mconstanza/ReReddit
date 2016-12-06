// Dependencies

var express = require('express');
// var models = require('../models');
var passport = require('passport');

var request = require('request');
var cheerio = require('cheerio');

// create the express router
var router = express.Router();

router.get('/articles', function(req, res) {
  res.send('You logged in!');
  // Scrape function
});

router.get('/scrape', function(req, res) {
  request("http://www.reddit.com/r/aww", function(error, response, html) {

    // load the web page into cheerio
    var $ = cheerio.load(html);

    // collect all of the reddit stories -- they have a '.thing' class
    $(".thing").each(function(i, element) {
      var result = {};

      result.title = $(this).children(".entry").children(".title").text();
      result.link = $(this).attr("data-url");

      console.log(result);
    });


  });
});








module.exports = router;
