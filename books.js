const Books = require("./models/book");
const app =require("express")
// Get books titles
router.get("/", async (req, res, next) => {
  const books = await Books.find();
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
});
await newBook.save()

res.status(201).json({message:`created a new book sucessfully`});