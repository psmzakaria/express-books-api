const request = require("supertest");
const express = require("express");
const authorRouter = require("./author");

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongod = new MongoMemoryServer();
const mongoose = require("mongoose");
const Author = require("./../models/author");
//Why do this mounting ?
const app = express();
authorRouter(app);

async function addFakeAuthors() {
  const author1 = new Author({
    name: "paulo",
    age: 49
  });

  await author1.save();

  const author2 = new Author({
    name: "john",
    age: 50
  });

  await author2.save();
}

beforeAll(async () => {
  jest.setTimeout(120000);

  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri);
  addFakeAuthors();
});

afterAll(() => {
  mongoose.disconnect();
  mongod.stop();
});

test("GET/authors", async () => {
  const response = await request(app).get("/authors");
  expect(response.status).toBe(200);
  expect(response.body.length).toEqual(2);
});

test("POST/authors", async () => {
  const newAuthor = {
    tile: "New Author",
    age: 49
  };
  const response = await request(app)
    .post("/authors")
    .send(newAuthor);
  expect(response.status).toBe(201);
  const authors = await Author.find();
  expect(authors.length).toBe(3);
});
