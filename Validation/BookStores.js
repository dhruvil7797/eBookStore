const Joi = require('joi');
const { alphaNumericPatter, passwordPattern } = require('../Config/regex')

// Schema to validate bookStore object
const addBookStoreSchema = Joi.object().keys({
    name: Joi.string().required().min(3).max(50).regex(alphaNumericPatter),
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(passwordPattern)
})

module.exports = {
    addBookStoreSchema: addBookStoreSchema
}