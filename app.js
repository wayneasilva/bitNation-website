const express = require("express");
const app = express();
const fetch = require("fetch");
const mongoose = require("mongoose");

//APP CONFIGURATION
mongoose.connect("mongodb://localhost:27017/crypto_DB", { useNewUrlParser: true, useFindAndModify: false });
app.set("view engine, ejs");
app.use(express.static("public"));

//MODEL CONFIGURATION

//RESTUL ROUTES

//ROOT DIRECTORY
app.get("/", function(req, res) {
    res.send("Groot");
})

app.get("/")