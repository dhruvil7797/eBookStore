const knex = require("../db/knex");
const { bookStore } = require("./dbValues")

/**
 * return json object having id provided as param
 *
 * @param {number} id                  bookstore id
 *
 */

let getBookStoreById = async (id) => {
    let data = await knex.select()
        .from(bookStore.name)
        .where(bookStore.column.id, id);
    return data;
}

/**
 * return json object having email provided as param
 *
 * @param {string} email                  bookstore email
 *
 */
let getBookStoreByEmail = async (email) => {
    let data = await knex.select()
        .from(bookStore.name)
        .where(bookStore.column.email, email);
    return data;
}

/**
 * return newly created json object
 *
 * @param {object} storeJson                details for a bookstore
 *
 */
let createStore = async (storeJson) => {
    let data = await knex(bookStore.name).insert(storeJson);
    let store = await getBookStoreById(data[0]);
    return store;
}

/**
 * delete a store having id provided as param and returns number of rows deleted
 *
 * @param {number} id           bookstore id
 *
 */
let deleteStoreById = async (id) => {
    let data = await knex(bookStore.name)
        .where(bookStore.column.id, id)
        .update({
            [bookStore.column.deleted]: true
        });
    return data;
}

module.exports = {
    getStoreById: getBookStoreById,
    getStoreByEmail: getBookStoreByEmail,
    createStore: createStore,
    deleteStoreById: deleteStoreById
}