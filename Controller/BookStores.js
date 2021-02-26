const { rw, code } = require('../Helper/ResponseGenerator');
const knex = require('../db/knex');
const { compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { bookStore } = require('../Helper/dbValues');
const setupConfig = require('../Config/setup');
const { addBookStoreSchema } = require('../Validation/BookStores');
const { newStore } = require('../Helper/ObjectGenerator');
const { getStoreByEmail, createStore, deleteStoreById } = require('../Helper/BookStores');
const { getBooks } = require('../Helper/Books');

/**
 * Handle the request to get all books for a particular bookstore
 * This request will be called at each minute to fetch the latest stock
 *
 * @param {Request} request             Request object that will be sent by client
 * @param {Response} response           Response object that will be sent to client
 *
 */
let getAllBooks = async (req, res) => {
    let id = req.body.bookStore[bookStore.column.id];
    let books = await getBooks(id);
    res.status(code.SUCCESS).send(rw(true, `${books.length} Stores found`, {
        count: books.length,
        books: books
    }))
}

/**
 * Handle the request to add bookstore in database
 *
 * @param {Request} request             Request object that will be sent by client
 * @param {Response} response           Response object that will be sent to client
 *
 */
let addBookStore = async (req, res) => {
    try {
        await addBookStoreSchema.validateAsync(req.body, { abortEarly: false });

        let storeExist = await getStoreByEmail(req.body.email);

        if (storeExist.length !== 0)
            return res.status(code.INVALID_DATA).send(rw(false, "Store already exist with given email address."));

        let store = await createStore(newStore(req.body.name, req.body.email, req.body.password));
        if (store.length === 0)
            return res.status(code.SERVER_ERROR).send(rw(false, "Server error. Please try again"));
        res.status(code.SUCCESS).send(rw(true, "Store created", store[0]));

    } catch (error) {
        return res.status(code.INVALID_DATA).send(rw(false, error.message));
    }
}

/**
 * Handle the request to delete bookstore in database
 *
 * @param {Request} request             Request object that will be sent by client
 * @param {Response} response           Response object that will be sent to client
 *
 */
let deleteBookStores = async (req, res) => {
    let id = req.body.bookStore[bookStore.column.id];
    let status = await deleteStoreById(id);
    if (status !== 0) {
        return res.status(code.SUCCESS).send(rw(true, "Store deleted", { id: id }));
    }
    return res.status(code.SERVER_ERROR).send(rw(false, "Error while deleting store. Please try again"));
}

/**
 * Handle the request to login as a bookstore
 *
 * @param {Request} request             Request object that will be sent by client
 * @param {Response} response           Response object that will be sent to client
 *
 */
let loginBookStore = async (req, res) => {
    // Validating Request
    if (!req.body.email || !req.body.password)
        return res.status(code.MISSING_ARGUMENT).send(rw(false, "Email or password is not provided"));

    try {
        let data = await getStoreByEmail(req.body.email);

        if (data.length === 0)
            return res.status(code.INVALID_DATA).send(rw(false, "Email does not exist"));

        else if (data[0][bookStore.column.deleted])
            return res.status(code.FORBIDDEN).send(rw(false, "Bookstore is deleted"));

        else {
            // If invalid password
            if (!compareSync(req.body.password, data[0][bookStore.column.password]))
                return res.status(code.INVALID_DATA).send(rw(false, "Credentials does not match"));

            else {
                // Generate auth token and send as response
                let token = sign({ id: data[0][bookStore.column.id] }, setupConfig.secret, {
                    expiresIn: 84600 // expires in 24 hours
                });
                return res.status(code.SUCCESS)
                    .send(rw(true, "Credentials validated", { token: token }));
            }
        }
    } catch (error) {
        res.status(code.SERVER_ERROR).send(rw(false, "Sever error. Please try again"));
    }
}

module.exports = {
    getAllBooks: getAllBooks,
    addBookStore: addBookStore,
    deleteBookStores: deleteBookStores,
    login: loginBookStore
}