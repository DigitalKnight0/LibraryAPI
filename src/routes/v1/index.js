const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const roleRoute = require('./role.route');
const docsRoute = require('./docs.route');
const bookRoute = require('./book.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/roles', roleRoute);
router.use('/docs', docsRoute);
router.use('/books', bookRoute);

module.exports = router;
