//jshint esversion:6
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");

const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://admin-arjun:Test123@cluster0.vipcp.mongodb.net/formDB", { useNewUrlParser: true });

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    message: String
});

const Form = mongoose.model("Form", formSchema);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const form = new Form({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        message: req.body.message
    });
    form.save(function(err) {
        if (!err) {
            console.log("Data saved successfully!");
        } else {
            console.log(err);
        }
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function() {
    console.log("Server working on Port: 3000");
});