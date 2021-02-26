const { hashSync } = require("bcryptjs")
const { book, bookStore } = require("./dbValues")

let bookGenerator = (name, qty, price, storeId) => {
    return {
        [book.column.name]: name,
        [book.column.qty]: qty,
        [book.column.price]: price,
        [book.column.store]: storeId
    }
}

let storeGenerator = (name, email, password) => {
    return {
        [bookStore.column.name]: name,
        [bookStore.column.email]: email,
        [bookStore.column.password]: hashSync(password)
    }
}

module.exports = {
    newBook: bookGenerator,
    newStore: storeGenerator
}