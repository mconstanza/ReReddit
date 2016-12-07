// Dependencies

var express = require('express');
// var models = require('../models');
var passport = require('passport');
var Article = require('../models/Article');

var request = require('request');
var cheerio = require('cheerio');

// create the express router
var router = express.Router();


// HOME PAGE
router.get('/', function(req, res) {
    scrape();
    Article.find().lean().exec({}, function(error, articles) {
        if (error) {
            reject(Error(error));
        } else {
            // res.json(doc);
            // console.log('doc: '+ doc);
            console.log('articles: ' + JSON.stringify(articles));
            res.render('index', {articles: articles});
        }
    });
});

// PULLING ARTICLES FROM DATABASE
router.get('/articles', function(req, res) {
    // Scrape the news site to see if there are any new articles
    // scrape();
    Article.find({}, function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            res.json(doc);
        }
    });
});

router.get('/scrape', function(req, res) {
    scrape();
});

// SCRAPE FUNCTION
function scrape() {

    return new Promise(function(resolve, reject) {
        request("http://www.reddit.com/r/aww", function(error, response, html) {

            // load the web page into cheerio
            var $ = cheerio.load(html);

            // collect all of the reddit stories -- they have a '.thing' class
            $(".thing").each(function(i, element) {
                var result = {};

                result.title = $(this).children(".entry").children(".title").text();
                result.link = $(this).attr("data-url");
                result.img = $(this).children(".thumbnail").children("img").attr("src");

                console.log("result: " + JSON.stringify(result)); // development

                // create new article to save to the Database
                var article = new Article(result);

                console.log("\nArticle: " + article);

                // check if the article is already in the Database
                Article.findOne({
                    title: article.title
                }, 'title link img', function(error, found) {

                    if (found) {
                        // if article with same title is found, do not save the article in the database
                        console.log('story already in database');
                    } else {
                        // if no match, save the article in the database
                        article.save(function(err, doc) {
                            if (err) {
                                reject(Error(err));
                            } else {

                                resolve(console.log("\n" + doc));
                            }
                        });
                    }
                });
            });
            console.log("Scrape Complete.");
            resolve();
        });
    });
}



module.exports = router;
