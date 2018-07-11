const express = require("express");
const router = express.Router();
const Books = require("../models/book");
// Get books titles
router.get("/", async (req, res, next) => {
  const books = await Books.find().populate("author");
  res.json(books);
});

router.get("/:id", (req, res, next) => {
  res.json({ message: `get book with id ${req.params.id}` });
});

// Post books
router.post("/", async (req, res, next) => {
  const newBook = new Books({
    title: req.body.title,
    author: req.body.author
  });
  await newBook.save();

  res.json({ message: `created a new book sucessfully` });
});

router.put("/:id", (req, res, next) => {
  res.json({ message: `update book with id ${req.params.id}` });
});

router.delete("/:id", (req, res, next) => {
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = router;
