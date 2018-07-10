const mongoose = require("mongoose");

//Create Schema
const booksSchema = mongoose.Schema({
  title: String,
  author: String
});
//Create model from schema
;

//Export model
module.exports=mongoose.model("Books",booksSchema)