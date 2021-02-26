const express = require('express');
const { isAuthenticated } = require('../Helper/Auth');
const { addBook, updateBook, deleteBook, getBook } = require('../Controller/Books')

let router = express.Router();

// Get a book using id as param
router.get("/Books/:id", isAuthenticated, getBook);

// Add book in database
router.post("/Books", isAuthenticated, addBook);

// Update existing book with id as param
router.patch("/Books/:id", isAuthenticated, updateBook);

// Delete existing book with id as param
router.delete("/Books/:id", isAuthenticated, deleteBook);

module.exports = { bookRouter: router }