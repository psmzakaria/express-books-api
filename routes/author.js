const Author = require("../models/author");
const express = require("express");
const router = express.Router();
// Post author
router.post("/", async (req, res, next) => {
  const newAuthor = new Author({
    name: req.body.name,
    age: req.body.age
  });
  await newAuthor.save();

  res.status(201).json({ message: `created a new Author sucessfully` });
});

router.get("/", async (req, res, next) => {
  const author = await Author.find();
  res.status(200).json(author);
});
router.get("/", async (req, res, next) => {
  const author = await Author.find();
  res.json(author);
});

module.exports = app => {
  app.use(express.json());
  app.use("/authors", router);
};
