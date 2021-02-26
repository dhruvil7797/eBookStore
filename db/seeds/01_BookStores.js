const { hashSync } = require("bcryptjs");
const { bookStore } = require("../../Helper/dbValues");
const { newStore } = require('../../Helper/ObjectGenerator')

// Seed data into bookstores table
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(bookStore.name).del()
    .then(function () {
      // Inserts seed entries
      return knex(bookStore.name).insert([

        newStore('Book Store 1', 'Dummy1@email.com', "P@ssword123"),
        // P@ssword1234
        newStore('Book Store 2', 'Dummy2@email.com', "P@ssword1234"),
        // P@ssword1234
        newStore('Book Store 3', 'Dummy3@email.com', "P@ssword12345")

      ]);
    });
};
