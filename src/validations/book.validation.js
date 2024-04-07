const Joi = require('@hapi/joi');

const CATEGORIES = ['horror', 'fiction','Romance']

const createBook = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        author: Joi.string().required(),
        ISBN: Joi.string().required(),
        price: Joi.number().required(),
        published_year: Joi.number().required(),
        category: Joi.string().lowercase().valid(...CATEGORIES).required(),
    })
}

const getBooks = {
    query: Joi.object().keys({
        page: Joi.number().min(1),
        limit: Joi.number().min(1),
    })
}

const getBook = {
    params: Joi.object().keys({
        bookId: Joi.number().required()
    }),
}

const searchBooks = {
    query: Joi.object().keys({
        title: Joi.string(),
        ISBN: Joi.string(),
    })
}

const updateBook = {
    params: Joi.object().keys({
        bookId: Joi.number().required()
    }),
    body: Joi.object().keys({
        title: Joi.string(),
        author: Joi.string(),
        ISBN: Joi.string(),
        price: Joi.number(),
        published_year: Joi.number(),
        category: Joi.string().lowercase().valid(...CATEGORIES),
    }).min(1)
}

const deleteBook = {
    params: Joi.object().keys({
        bookId: Joi.number().required()
    }),
}

const borrowBook = {
    params: Joi.object().keys({
        bookId: Joi.number().required()
    })
}

const returnBook = {
    params: Joi.object().keys({
        bookId: Joi.number().required()
    })
}

const getBorrowsByBookId = {
    params: Joi.object().keys({
        bookId: Joi.number().required()
    })
}

const searchByCategory = {
    query: Joi.object().keys({
        category: Joi.string().lowercase().valid(...CATEGORIES).required()
    })
}

module.exports = {
    createBook,
    getBooks,
    getBook,
    searchBooks,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    getBorrowsByBookId
}