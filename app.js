const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const index = require("./routes/index");
const books = require("./routes/books");
mongoose.connect("mongodb://localhost/jumpstart");
const authors =require("./routes/author")
const db = mongoose.connection;
db.on("error", error => {
  console.error("An error occurred!", error);
});
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/authors",authors)
app.use("/", index);
app.use("/books", books);

module.exports = app;
