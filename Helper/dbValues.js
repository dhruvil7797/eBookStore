let bookColumn = {
    id: 'bookId',
    name: 'name',
    qty: 'qty',
    price: 'price',
    store: 'store_id',
    deleted: 'isDeleted',
    createdAt: 'createdAt'
}

let bookStoreColumn = {
    id: 'storeId',
    name: 'name',
    email: 'email',
    password: 'password',
    deleted: 'isDeleted',
    createdAt: 'createdAt'
}

let tableName = {
    book: {
        name: 'books',
        column: bookColumn
    },
    bookStore: {
        name: 'bookstores',
        column: bookStoreColumn
    }
}

module.exports = tableName