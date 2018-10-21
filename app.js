const express = require("express");
const app = express();
const fetch = require("fetch");
const mongoose = require("mongoose");

//APP CONFIGURATION
mongoose.connect("mongodb://localhost:27017/crypto_DB", { useNewUrlParser: true, useFindAndModify: false });
app.set("view engine", "ejs");
app.use(express.static("public"));

//MODEL CONFIGURATION
const articleSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    createdBy: {type: String, default: 'sunflowerSamurai'},
    createdOn: {type: Date, default: Date.now}
})

const Article = mongoose.model("article", articleSchema);

Article.create({
    title: 'Cryptocurrency In A Changing World',
    image: 'https://unsplash.com/photos/A8vxLvrk-hE',
    body: 'Tech virtual drone online browser platform through in a system. But stream software offline. Professor install angel sector anywhere create at components smart. Document fab developers encryption smartphone powered, bespoke blockstack edit atoms. Companies a storage adopters. Hardware company planet, torrent ut developers stream, engineering keyphrase end. Document reality edit, install strategy startups hardware stream, analytics e-commerce smart. Privacy news data policies analytics documents.Now digital designs id anywhere atoms. Now strategy startups documents designs. Venture crypto adopters niche. Video algorithm system ultra-private policies engineering. Users takedowns. In apps torrent, decentralized bespoke IPO funding, change word company. e-commerce components goods support in file system edit steem on videos engineering algorithm hundreds; Pocketable strategy startups e-commerce system. Document 1,000 how torrent, non security mi sell crypto. Despite clever designers how, word steem ability analytics.Crytocurrency bespoke decentralized. In a smart home. Companies privacy build at activists data. privacy Ultra-private funding apps, strategy startups onecutive computer. In startups developers bot precision anywhere entrepreneurs. Visionary fab bespoke strong in cloud. Despite policies ability bespoke strong deal cryptocurrency. Now forecast security edit. Services circuit company read, at labs smartphone deal direct. Document components offline, security crypto devices funding, Ultra-private on internet.'
})
//RESTUL ROUTES

//ROOT ROUTE
app.get("/", function(req, res) {
    res.redirect("articles");
})

//INDEX ROUTE
app.get("/articles", function(req, res) {
    Article.find({}, function(err, articles) {
        if (err) {
            console.log("Beep Boop!? Something went wrong!")
        }
        else {
            res.render("index", {articles: articles});
        }
    })
})

//CREATE ROUTE
app.post("/articles", function(req, res) {
    Article.create()
})

//LISTEN ON PORT 3000
app.listen(3000, function() {
    console.log('INITIALIZED SERVER');
});