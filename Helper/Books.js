const knex = require("../db/knex");
const { book } = require("./dbValues");

/**
 * Fetch all books for a particular bookstore using id passed as param
 *
 * @param {number} id               id of the bookstore for which books has to be fetched
 *
 */
let getAllBookById = async (id) => {
    let data = await knex.select()
        .from(book.name)
        .where(book.column.store, id)
        .where(book.column.deleted, false);
    return data;
}

/**
 * Fetch a book using id provided as param
 *
 * @param {number} id               book id
 *
 */
let getBookById = async (id) => {
    let data = await knex.select()
        .from(book.name)
        .where(book.column.id, id);
    return data;
}

/**
 * Create book and return book as json
 *
 * @param {object} bookJson                 Json object contains details for the book
 *
 */
let createBook = async (bookJson) => {
    let data = await knex(book.name).insert(bookJson);
    let res = getBookById(data[0]);
    return res;
}

/**
 * delete book using id and return number of rows deleted
 *
 * @param {number} id                  book id
 *
 */
let deleteBookById = async (id) => {
    let data = await knex(book.name)
        .where(book.column.id, id)
        .update({
            [book.column.deleted]: true
        });
    return data;
}

/**
 * update book using id and jsonObject provided as param
 *
 * @param {number} id                   book id
 * @param {object} bookJson             json object containing book data
 *
 */
let updateBookById = async (id, bookJson) => {
    let data = await knex(book.name)
        .where(book.column.id, id)
        .update({
            [book.column.name]: bookJson.name,
            [book.column.price]: bookJson.price,
            [book.column.qty]: bookJson.qty
        });
    return data;
}

module.exports = {
    getBooks: getAllBookById,
    getBookById: getBookById,
    createBook: createBook,
    deleteBookById: deleteBookById,
    updateBookById: updateBookById
}