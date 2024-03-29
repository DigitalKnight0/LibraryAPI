const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { bookService } = require('../services');
const ApiError = require('../utils/ApiError');


const createBook = catchAsync(async (req, res) => {
    const book = await bookService.createBook(req.body);
    res.status(httpStatus.CREATED).send(book);
});

const getBooks = catchAsync(async (req, res) => {
    const books = await bookService.getBooks(req);
    res.send(books);
})

const getBook = catchAsync(async (req, res) => {
    const book = await bookService.getBook(req.params.bookId);
    res.send(book);
})

const searchBooks = catchAsync(async (req, res) => {
    const books = await bookService.searchBooks(req.query);
    res.send(books);
})

const updateBook = catchAsync(async (req, res) => {
    const book = await bookService.updateBook(req.params.bookId, req.body);
    if(!book) {
        throw new ApiError(httpStatus.NOT_FOUND, "Book Not Found")
    }
    res.send(book);
})

const deleteBook = catchAsync(async (req, res) => {
    await bookService.deleteBook(req.params.bookId);
    res.send({ success: true });
})

const borrowBook = catchAsync(async (req, res) => {
    await bookService.borrowBook(req);
    res.status(httpStatus.CREATED).send({ borrowed: true });
})

const returnBook = catchAsync(async (req, res) => {
    await bookService.returnBook(req);
    res.send({ returned: true });
})

const getBorrowsByBookId = catchAsync(async (req, res) => {
    const borrows = await bookService.getBorrowsByBookId(req.params.bookId);
    res.send(borrows);
})

const searchByCategory = catchAsync(async (req, res) => {
    const books = await bookService.searchByCategory(req.query.category);
    res.send(books);
})

module.exports = {
    createBook,
    getBooks,
    getBook,
    searchBooks,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    getBorrowsByBookId,
    searchByCategory
}