const express = require("express");
const router = express.Router();
const Books = require("../models/book");
// Get books titles
router.get("/", async (req, res, next) => {
  const books = await Books.find().populate("author");
  res.json(books);
});

// Post books
router.post("/", async (req, res, next) => {
  const newBook = new Books({
    title: req.body.title,
    author: req.body.author
  });
  await newBook.save();

  res.status(201).json({ message: `created a new book sucessfully` });
});
// GET books by :id
router.get("/:id", async (req, res, next) => {
  try {
    const book = await Books.findById(req.params.id);
    res.json(book);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  res.json({ message: `update book with id ${req.params.id}` });
});

router.delete("/:id", (req, res, next) => {
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = app => {
  app.use(express.json());
  app.use("/books", router);
};
