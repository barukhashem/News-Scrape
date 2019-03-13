// This imports the dependencies:
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


// This imports the axios and cheerio scraping tools:
// (Axios is a promised-based http library similar to jQuery's Ajax method; it works on the client and on the server:
var axios = require("axios");
var cheerio = require("cheerio");

// This imports all models:
var db = require("./models");

// This sets the port as 3000:
var PORT = 3000;

// This initializes Express:
var app = express();

// This configures middleware:

// This uses morgan logger for logging requests:
app.use(logger("dev"));
// This parses the request body as JSON:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// This makes a static folder public:
app.use(express.static("public"));

// This connects to the Mongo DB:
mongoose.connect("mongodb://localhost/scrapedData", { useNewUrlParser: true });

// Routes

// This is a GET route for scraping the echoJS website:
app.get("/", function (req, res) {
    // This grabs the body of the html with axios:
    axios.get("http://www.israelnationalnews.com/").then(function (response) {
        // This loads that into cheerio and saves it to $ for a shorthand selector:
        var $ = cheerio.load(response.data);
        var articles = [];
        // This grabs every h2 within an article tag:
        $("a.TLink").each(function (i, element) {

            // This saves an empty result object:
            var result = {};

            // This adds the text and href of every link and saves them as properties of the result object:
            result.title = $(this)
                .children("h2")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            // This creates a new Article using the `result` object built from scraping:
            db.Article.create(result)
                .then(function (dbArticle) {

                    // This logs the added result in the console:
                    console.log(dbArticle);

                    // This pushes the added result into the articles array:
                    articles.push(dbArticle);
                })
                .catch(function (err) {

                    // If an error occurred, this logs it:
                    console.log(err);
                });
        });

        // This sends a message to the client:
        res.send(articles);

    });
});

// Route for getting all Articles from the db
app.get("/articles", function (req, res) {

    // This grabs every document in the Articles collection:
    db.Article.find({})
        .then(function (dbArticle) {

            // If Articles were successfully found, this sends them back to the client:
            res.json(dbArticle);
        })
        .catch(function (err) {

            // If an error occurred, this sends it to the client:
            res.json(err);
        });
});

// Route for grabbing a specific Article by id, populate it with its note
app.get("/articles/:id", function (req, res) {

    // Using the id passed in the id parameter, this prepares a query that finds the matching one in the db:
    db.Article.findOne({ _id: req.params.id })

        // and then populates all the associated notes:
        .populate("note")
        .then(function (dbArticle) {

            // If an Article with the given id was successfully found, this sends it back to the client:
            res.json(dbArticle);
        })
        .catch(function (err) {

            // If an error occurred, this sends it to the client:
            res.json(err);
        });
});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res) {

    // This creates a new note and passes the req.body to the entry:
    db.Note.create(req.body)
        .then(function (dbNote) {

            // If a Note was created successfully, this finds an Article with an `_id` equal to `req.params.id`. Then it updates the Article to be associated with the new Note.
            // { new: true } tells the query to return the updated User -- it returns the original by default.
            // Since the mongoose query returns a promise, it can chain another `.then` which receives the result of the query:
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {

            // If an Article was successfully updated, this sends it back to the client:
            res.json(dbArticle);
        })
        .catch(function (err) {

            // If an error occurred, this sends it to the client:
            res.json(err);
        });
});

// This starts the server:
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});