const express = require('express');
const validate = require('../../middlewares/validate');
const bookValidation = require('../../validations/book.validation');
const bookController = require('../../controllers/book.controller');
const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');


const router = express.Router();

router.post(
    '/create',
    grantAccess('createAny', resources.BOOK),
    validate(bookValidation.createBook),
    bookController.createBook
);

router.get(
    '/',
    grantAccess('readAny', resources.BOOK),
    validate(bookValidation.getBooks),
    bookController.getBooks
);

router.get(
    '/:bookId',
    grantAccess('readAny', resources.BOOK),
    validate(bookValidation.getBook),
    bookController.getBook
);

router.get(
    '/search',
    grantAccess('readAny', resources.BOOK),
    validate(bookValidation.searchBooks),
    bookController.searchBooks
);

router.patch(
    '/:bookId',
    grantAccess('updateAny', resources.BOOK),
    validate(bookValidation.updateBook),
    bookController.updateBook
);

router.delete(
    '/:bookId',
    grantAccess('deleteAny', resources.BOOK),
    validate(bookValidation.deleteBook),
    bookController.deleteBook
);

router.post(
    '/:bookId/borrow',
    grantAccess('readAny', resources.BOOK),
    validate(bookValidation.borrowBook),
    bookController.borrowBook
);

router.post(
    '/:bookId/return',
    grantAccess('readAny', resources.BOOK),
    validate(bookValidation.returnBook),
    bookController.returnBook
);

router.get(
    '/:bookId/borrows',
    grantAccess('updateAny', resources.BOOK),
    validate(bookValidation.getBorrowsByBookId),
    bookController.getBorrowsByBookId
);

router.get(
    '/search/category',
    grantAccess('readAny', resources.BOOK),
    validate(bookValidation.searchByCategory),
    bookController.searchByCategory
);

module.exports = router;

/**
 * @swagger
 * /books/create:
 *   post:
 *     summary: Create a new book.
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               ISBN:
 *                 type: string
 *               published_year:
 *                 type: integer
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *             required:
 *               - title
 *               - author
 *               - ISBN
 *               - published_year
 *               - category
 *               - price
 *     responses:
 *       '200':
 *         description: Book created successfully.
 *       '401':
 *         description: Unauthorized.
 */


/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books.
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of books to return per page.
 *         default: 10
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number of the results.
 *         default: 1
 *     responses:
 *       '200':
 *         description: A list of books.
 *       '401':
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /books/{bookId}:
 *   get:
 *     summary: Get a book by ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID of the book to get.
 *     responses:
 *       '200':
 *         description: Book found successfully.
 *       '404':
 *         description: Book not found.
 *       '401':
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Search books by title or ISBN.
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Title of the book to search for.
 *       - in: query
 *         name: ISBN
 *         schema:
 *           type: string
 *         description: ISBN of the book to search for.
 *     responses:
 *       '200':
 *         description: Books found successfully.
 *       '401':
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /books/{bookId}:
 *   patch:
 *     summary: Update a book by ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID of the book to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               ISBN:
 *                 type: string
 *               published_year:
 *                 type: integer
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *             required:
 *               - title
 *               - author
 *               - ISBN
 *               - published_year
 *               - category
 *               - price
 *     responses:
 *       '200':
 *         description: Book updated successfully.
 *       '404':
 *         description: Book not found.
 *       '401':
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /books/{bookId}:
 *   delete:
 *     summary: Delete a book by ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID of the book to delete.
 *     responses:
 *       '200':
 *         description: Book deleted successfully.
 *       '404':
 *         description: Book not found.
 *       '401':
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /books/{bookId}/borrow:
 *   post:
 *     summary: Borrow a book by ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID of the book to borrow.
 *     responses:
 *       '200':
 *         description: Book borrowed successfully.
 *       '404':
 *         description: Book not found.
 *       '401':
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /books/{bookId}/return:
 *   post:
 *     summary: Return a borrowed book by ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID of the book to return.
 *     responses:
 *       '200':
 *         description: Book returned successfully.
 *       '404':
 *         description: Book not found.
 *       '401':
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /books/{bookId}/borrows:
 *   get:
 *     summary: Get borrows of a book by ID.
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         schema:
 *           type: integer
 *           format: int64
 *         required: true
 *         description: ID of the book.
 *     responses:
 *       '200':
 *         description: Book borrows found successfully.
 *       '404':
 *         description: Book not found.
 *       '401':
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /books/search/category:
 *   get:
 *     summary: Search books by category.
 *     security:
 *       - bearerAuth: []
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category to search for.
 *     responses:
 *       '200':
 *         description: Books found successfully.
 *       '401':
 *         description: Unauthorized.
 */