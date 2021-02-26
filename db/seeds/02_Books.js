const { book } = require("../../Helper/dbValues");
const { newBook } = require('../../Helper/ObjectGenerator')

// Seed data into books table
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(book.name).del()
    .then(function () {
      return knex(book.name).insert([
        newBook('Book 1', 10, 100, 1),
        newBook('Book 2', 15, 80, 1),
        newBook('Book 3', 0, 20, 1),
        newBook('Book 4', 40, 10, 1),
        newBook('Book 5', 40, 10, 2),
        newBook('Book 6', 20, 70, 2),
        newBook('Book 7', 12, 65, 2),
      ]);
    });
};
