const request = require("supertest");
const express = require("express");
const booksRouter = require("./books");

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();
const mongoose = require("mongoose");
const Author = require("./../models/author")
const Book = require("./../models/book");

const app = express();
booksRouter(app);

let savedBooks1;
let savedBooks2;

async function addFakeBooks() {
  const authorX = new Author({
    name: "John",
    age: 29
  });

  const savedAuthor1 = await authorX.save();
  
  const book1 = new Book({
    title: "Game of Thrones",
    authors: savedAuthor1.id
  });

  savedBooks1 = await book1.save();

 
}

beforeAll(async () => {
  jest.setTimeout(100000);

  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri);
  await addFakeBooks();
});

afterAll(() => {
  mongoose.disconnect();
  mongod.stop();
});

test.only("GET/books/:id", async () => {
  const response = await request(app).get(`/books/${savedBooks1.id}`);
  expect(response.status).toBe(200);
  console.log(response.body)
  expect(response.body.title).toEqual(savedBooks1.title);
});

test("POST/books", async () => {
  const newBook = {
    title: "New Book",
    author: "Mr Author"
  };
  const response = await request(app)
    .post("/books")
    .send(newBook);
  expect(response.status).toBe(201);
  const books = await Book.find();
  expect(books.length).toBe(3);
});
module.exports = app => {
  app.use(express.json());
  app.use("/authors", router);
};
