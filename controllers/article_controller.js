// Dependencies

var express = require('express');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var passport = require('passport');
var Article = mongoose.model('Article');
var Comment = mongoose.model('Comment');

var request = require('request');
var cheerio = require('cheerio');

// create the express router
var router = express.Router();


// HOME PAGE
router.get('/', function(req, res) {
    // Scrape the news site to see if there are any new articles
    scrape();
    // Pull the articles from the database
    Article.find().lean().sort({ createdAt: -1 }).exec({}, function(error, articles) {
        if (error) {
            reject(Error(error));
        } else {
            // console.log('articles: ' + JSON.stringify(articles));
            res.render('index', {
                articles: articles
            });
        }
    });
});

// PULLING ARTICLES FROM DATABASE
router.get('/articles', function(req, res) {
    Article.find({}, function(error, doc) {
        if (error) {
            console.log(error);
        } else {
            res.json(doc);
        }
    });
});

router.get('/articles/:id', function(req, res) {
    var id = req.params.id;
    Article.find().lean().exec({_id:id}, '_id title link img', function(err, article) {
      if (err) console.log(err);
      res.json(article);
    });
});

router.post('/articles/:id', function(req, res) {
  var comment = new Comment(req.body);
  comment.save(function(error, doc) {
    if (error){
      console.log(error);
    }
  });
});

router.get('/articles/:id/comments', function(req, res) {
  console.log("\nreq ID: " + req.params.id);
  var articleId = req.params.id;
  Comment.find({article: new ObjectId(articleId)}, 'text', function(err, comments){
    if (err) console.log(err);
    console.log(comments);
    res.json(comments);
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
