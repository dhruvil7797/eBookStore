const { verify } = require("jsonwebtoken");
const setupConfig = require("../Config/setup");
const { where } = require("../db/knex");
const knex = require("../db/knex");
const { getStoreById } = require("./BookStores");
const { bookStore } = require("./dbValues");
const { code, rw } = require("./ResponseGenerator");

/**
 * Handle the request to authenticate an user using auth token
 *
 * @param {Request} request             Request object that will be sent by client
 * @param {Response} response           Response object that will be sent to client
 * @param {NextFunction} next           Function that will be executed if user is authenticated
 *
 */
let isAuthenticated = async (req, res, next) => {

    var token = req.get('x-access-token');

    if (!token) {
        return res.status(code.UNAUTHORIZED).send(rw(false, "No auth token provided"));
    }

    verify(token, setupConfig.secret, async function (err, decoded) {
        if (err)
            return res.status(code.UNAUTHORIZED).send(rw(false, "Fail to validate the user"));

        let data = await getStoreById(decoded.id);
        if (data.length === 0)
            return res.status(code.INVALID_DATA).send(rw(false, "Invalid token provided"));
        if (data[0][bookStore.column.deleted])
            return res.status(code.FORBIDDEN).send(rw(false, "Bookstore is already deleted"));
        req.body.bookStore = data[0];
        next();
    })
}

module.exports = { isAuthenticated: isAuthenticated }