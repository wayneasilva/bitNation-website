const express = require("express");
const app = express();
const mongoose = require("mongoose");
const request = require("request");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const methodOverride = require("method-override");

//APP CONFIGURATION
// mongoose.connect("mongodb://localhost:27017/crypto_DB", { useNewUrlParser: true, useFindAndModify: false });
mongoose.connect("mongodb://wayneasilva:Tobirama707@ds153730.mlab.com:53730/bitnation", { useNewUrlParser: true, useFindAndModify: false });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//MODEL CONFIGURATION
const articleSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    createdBy: {type: String, default: 'sunflowerSamurai'},
    createdOn: {type: Date, default: Date.now}
})

const Article = mongoose.model("article", articleSchema);

//RESTUL ROUTES

//ROOT ROUTE
app.get("/", function(req, res) {
    res.redirect("/articles");
})

//INDEX ROUTE
app.get("/articles", function(req, res) {
    Article.find({}, function(err, articles) {
        if (err) {
            console.log("Beep Boop!? Something went wrong!")
        }
        else {
            //urls which return respective token data(JSON)
            const urls = 
            [
                'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=BTC,USD,EUR',
                'https://min-api.cryptocompare.com/data/price?fsym=BCH&tsyms=BTC,USD,EUR',
                'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR',
                'https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=BTC,USD,EUR'
            ]

            // const pricesPromise = Promise.all(urls.map(url =>
            //     fetch(url).then(response => response.json())
            // ))

            Promise.all(urls.map(url =>
                fetch(url).then(response => response.json())
            )).then(prices => {return res.render("index", {articles: articles, prices: prices})})
            
            // setInterval(priceCheck, 10000);
        }
    })
})

//NEW ROUTE
app.get("/articles/new", function(req, res) {
    res.render("new");
})

//CREATE ROUTE
app.post("/articles", function(req, res) {
    Article.create(req.body.article, function(err, newArticle) {
        if (err) {
            res.render("new");
        }
        else {
            res.redirect("/articles");
        }
    })
})

//SHOW ROUTE
app.get("/articles/:id", function(req, res) {
    Article.findById(req.params.id, function(err, foundArticle) {
        if (err) {
            res.redirect("/articles");
        }
        else {
            res.render("show", {article: foundArticle});
        }
    })
})

//EDIT ROUTE
app.get("/articles/:id/edit", function(req, res) {
    Article.findById(req.params.id, function(err, foundArticle) {
        if (err) {
            res.redirect("articles");
        }
        else {
            res.render("edit", {article: foundArticle})
        }
    })
})

//UPDATE ROUTE
app.put("/articles/:id", function(req, res) {
    Article.findByIdAndUpdate(req.params.id, req.body.article, function(err, updatedArticle) {
        if (err) {
            res.redirect("/articles");
        }
        else {
            res.redirect("/articles/" + req.params.id);
        }
    })
})

//DELETE ROUTE
//DESTROY ROUTE
app.delete("/articles/:id", function(req, res) {
    Article.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log("FAILED TO DELETE");
            res.redirect("/articles");
        }
        else {
            //Let's prompt the user to confirm the delete later.
            res.redirect("/articles");
        }

    })
})

//LISTEN ON PORT 3000
app.listen(process.env.PORT, process.env.IP, function() {
    console.log('INITIALIZED SERVER');
})