const Joi = require('joi');
const { alphaNumericPatter } = require('../Config/regex')

// Schema to validate book object
const bookSchema = Joi.object().keys({
    name: Joi.string().required().min(3).max(50).regex(alphaNumericPatter),
    qty: Joi.number().required().min(0),
    price: Joi.number().required().positive()
}).unknown(true);


module.exports = {
    bookSchema: bookSchema
}
