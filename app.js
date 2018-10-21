const express = require("express");
const app = express();
const fetch = require("fetch");
const mongoose = require("mongoose");

//APP CONFIGURATION
mongoose.connect("mongodb://localhost:27017/crypto_DB", { useNewUrlParser: true, useFindAndModify: false });
app.set("view engine, ejs");
app.use(express.static("public"));

//MODEL CONFIGURATION
const articleSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    createdBy: {type: String, default: 'sunflowerSamurai'},
    createdOn: {type: Date, default: Date.now}
})
//RESTUL ROUTES

//ROOT DIRECTORY
app.get("/", function(req, res) {
    res.redirect("index");
})

app.get("/articles", function() {
    res.render("index");
})