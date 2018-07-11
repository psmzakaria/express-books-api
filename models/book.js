const mongoose = require("mongoose");

//Create Schema
const schema = mongoose.Schema({
  title: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
  }
});
//Create model from schema

//Export model
module.exports = mongoose.model("Book", schema);
