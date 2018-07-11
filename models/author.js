const mongoose = require("mongoose");

//Create Schema
const schema = mongoose.Schema({
  name: String,
  age: String
});
module.exports = mongoose.model("Author", schema);
