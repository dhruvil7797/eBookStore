const express = require('express');
const { getAllBooks, addBookStore, deleteBookStores, login } = require('../Controller/BookStores');
const { isAuthenticated } = require('../Helper/Auth');


let router = express.Router();

// Get all books for a particular store
router.get("/BookStores", isAuthenticated, getAllBooks);

// Create a new bookstore
router.post("/BookStores", addBookStore);

// Delete an existing bookstore
router.delete("/BookStores", isAuthenticated, deleteBookStores);

// Login as a bookstore
router.post("/Login", login);

module.exports = { bookStoreRouter: router }