const { getBookById, createBook, deleteBookById, updateBookById } = require("../Helper/Books");
const { book, bookStore } = require("../Helper/dbValues");
const { newBook } = require("../Helper/ObjectGenerator");
const { code, rw } = require("../Helper/ResponseGenerator");
const { bookSchema } = require("../Validation/Books");

/**
 * Handle the request to get particular book using book id
 *
 * @param {Request} request             Request object that will be sent by client
 * @param {Response} response           Response object that will be sent to client
 *
 */

let getParticularBook = async (req, res) => {
    let bookId = req.params.id;
    let bookData = await getBookById(bookId);

    if (bookData.length === 0)
        return res.status(code.INVALID_DATA).send(rw(false, "No book exist with given id"));
    if (bookData[0][book.column.store] !== req.body.bookStore[bookStore.column.id])
        return res.status(code.FORBIDDEN).send(rw(false, "Only store owner can access the book"));
    else
        return res.status(code.SUCCESS).send(rw(true, "Book found", bookData[0]));
}

/**
 * Handle the request to add book in database
 *
 * @param {Request} request             Request object that will be sent by client
 * @param {Response} response           Response object that will be sent to client
 *
 */
let addBook = async (req, res) => {
    try {
        await bookSchema.validateAsync(req.body, { abortEarly: false });
        let bookJson = newBook(req.body.name, req.body.qty, req.body.price, req.body.bookStore[bookStore.column.id]);
        let result = await createBook(bookJson);
        res.status(code.SUCCESS).send(rw(true, "New book added", result));
    } catch (error) {
        return res.status(code.INVALID_DATA).send(rw(false, error.message));
    }
}

/**
 * Handle the request to delete book in database
 *
 * @param {Request} request             Request object that will be sent by client
 * @param {Response} response           Response object that will be sent to client
 *
 */
let deleteBook = async (req, res) => {
    try {
        let bookData = await getBookById(req.params.id);
        if (bookData.length === 0)
            return res.status(code.INVALID_DATA).send(rw(false, "Book id is invalid"));
        if (bookData[0][book.column.store] != req.body.bookStore[bookStore.column.id])
            return res.status(code.INVALID_DATA).send(rw(false, "Only store owner of this book can delete the book"));
        let deleteResult = await deleteBookById(req.params.id);
        if (deleteResult !== 0) {
            return res.status(code.SUCCESS).send(rw(true, "Book deleted", { id: req.params.id }));
        }
        return res.status(code.SERVER_ERROR).send(rw(false, "Error while deleting the book. Please try again"));
    } catch (error) {
        return res.status(code.SERVER_ERROR).send(rw(false, "Error while deleting the book. Please try again"));
    }
}

/**
 * Handle the request to update book in database
 *
 * @param {Request} request             Request object that will be sent by client
 * @param {Response} response           Response object that will be sent to client
 *
 */
let updateBook = async (req, res) => {
    try {
        await bookSchema.validateAsync(req.body, { abortEarly: false });
        let bookData = await getBookById(req.params.id);
        if (bookData.length === 0)
            return res.status(code.INVALID_DATA).send(rw(false, "Book id is invalid"));
        if (bookData[0][book.column.store] != req.body.bookStore[bookStore.column.id])
            return res.status(code.INVALID_DATA).send(rw(false, "Only store owner of this book can delete the book"));

        let updateBookJson = newBook(req.body.name, req.body.qty, req.body.price);
        let result = await updateBookById(req.params.id, updateBookJson);
        if (result.length === 0)
            return res.status(code.SERVER_ERROR).send(rw(false, "Error while updating the book"));
        let updatedBook = await getBookById(req.params.id);
        return res.status(code.SUCCESS).send(rw(true, "Book updated", updatedBook));
    } catch (error) {
        return res.status(code.INVALID_DATA).send(rw(false, error.message));
    }
}

module.exports = {
    addBook: addBook,
    deleteBook: deleteBook,
    updateBook: updateBook,
    getBook: getParticularBook
}
