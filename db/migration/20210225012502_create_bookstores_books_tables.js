const { bookStore, book } = require('../../Helper/dbValues');

// Create the schema for the Books and Bookstores table
exports.up = function (knex, Promise) {

    return knex.schema.createTable(bookStore.name, function (table) {
        table.increments(bookStore.column.id).primary();
        table.string(bookStore.column.name).notNullable();
        table.string(bookStore.column.email).notNullable();
        table.string(bookStore.column.password).notNullable();
        table.boolean(bookStore.column.deleted).defaultTo(false);
        table.timestamp(bookStore.column.createdAt).defaultTo(knex.fn.now());
    })
        .then(function () {
            return knex.schema.createTable(book.name, function (table) {
                table.increments(book.column.id).primary();
                table.string(book.column.name).notNullable();
                table.integer(book.column.qty).notNullable();
                table.integer(book.column.price).notNullable();
                table.integer(book.column.store).unsigned().references('storeId').inTable('bookstores');
                table.boolean(book.column.deleted).defaultTo(false);
                table.timestamp(book.column.createdAt).defaultTo(knex.fn.now());
            })
        })

};

exports.down = function (knex) {
    return knex.schema.dropTable(book.name).dropTable(bookStore.name);
};
