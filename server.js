

// ===================================================
// Dependencies
// ===================================================
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// ===================================================
// Models
// ===================================================
var User = require("./models/User.js");
var Article = require("./models/Article.js");
var Comment = require("./models/comment.js");
// ===================================================
// Scraping
// ===================================================
var request = require("request");
var cheerio = require("cheerio");

var Promise = require("bluebird");

mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_wlflgg9z:81e7dmbs9heik6mhh409l973pv@ds119618.mlab.com:19618/heroku_wlflgg9z");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

app.use(expressSession({secret: 'darkKnight',
                        store: new MongoStore({ mongooseConnection: mongoose.connection }),
                        resave: false,
                        saveUninitialized: false
                      }));
app.use(passport.initialize());
app.use(passport.session());





// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
