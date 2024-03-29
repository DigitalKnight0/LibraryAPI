const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../db/models');
const { Op } = require('sequelize');
const getOffset = require('../utils/query');

const createBook = async (body) => {
    const prevBook = await db.findOne({
        where: {
            [Op.or]: [
                { ISBN: body.ISBN },
                { title: { [Op.like]: `${body.title}` } }
            ]
        }
    });

    if (prevBook) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'ISBN or title in use by another book');
    }

    const book = await Book.create(body);
    return book;
}

const getBooks  = async (req) => {
    const { page: defaultPage, limit: defaultLimit } = config.pagination;
	const { page = defaultPage, limit = defaultLimit } = req.query;

	const offset = getOffset(page, limit);

    const books = await db.book.findAndCountAll({
        offset,
        limit,
        raw: true,
    });

    return books;
}

const getBook = async (bookId) => {
    const book = await db.book.findOne({
        where: { id: bookId }
    });

    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }

    return book;
}

const searchBooks = async (query) => {
    const { title, ISBN } = query;

    const books = await db.book.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${title}%` } },
                { ISBN: ISBN }
            ]
        }
    });

    return books;
}

const updateBook = async (bookId, body) => {
    const prevBook = await db.book.findOne({
        where: {
            [Op.or]: [
                { ISBN: body.ISBN },
                { title: { [Op.iLike]: `${body.title}` } }
            ]
        }
    });

    if (prevBook) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Title or ISBN in use by another book');
    }
    
    const updatedBook = await db.book
    .update(
        { ...req.body },
        {
            where: { id: bookId || req.body.id },
            returning: true,
            plain: true,
            raw: true,
        }
    )
    .then((data) => data[1]);

    return updatedBook;
}

const deleteBook = async (bookId) => {
    const book = await db.book.destroy({
        where: { id: bookId }
    });

    if (!book) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
    }

    return book;
}

const getCurrentlyBorrowedBy = async (bookId) => {
    const book = await getBook(bookId);
    const borrow = await db.borrow_book.findOne({
        where: {
            book_id: bookId,
            returned_at: null
        }
    });

    return borrow ? borrow.user_id : null;
}

const borrowBook = async (req) => {
    const { bookId } = req.params;
    const { user_id } = req.user.userId;

    if(await getCurrentlyBorrowedBy(bookId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Book is currently borrowed');
    }

    const borrow = await db.borrow_book.create({
        user_id,
        book_id: bookId
    });

    return borrow;
}

const returnBook = async (req) => {
    const { bookId } = req.params;
    const { user_id } = req.user.userId;

    const borrow = await getCurrentlyBorrowedBy(bookId);

    if(borrow && borrow.user_id !== user_id) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Book is not borrowed by the user');
    }

    borrow.returned_at = new Date();
    await borrow.save();

    return borrow;
}

const getBorrowsByBookId = async (bookId) => {
    const borrows = await db.borrow_book.findAll({
        where: {
            book_id: bookId
        }
    });

    const currentlyBorrowedBy = await getCurrentlyBorrowedBy(bookId);

    return {
        borrows,
        currentlyBorrowedBy
    }

}

const searchByCategory = async (category) => {
    const books = await db.book.findAll({
        where: {
            category
        }
    });

    return books;
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
    getBorrowsByBookId,
    searchByCategory
}