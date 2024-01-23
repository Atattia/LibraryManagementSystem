const express = require('express');
const router = express.Router();
const borrowedBooksController = require('../controllers/borrowedBooksController');

// Checkout a book
router.post('/', borrowedBooksController.checkOutBook);

// List ALL borrowed books
router.get('/', borrowedBooksController.listBorrowedBooks);

// Return a book by ID
router.delete('/:id', borrowedBooksController.returnBook);

// List ALL overdue books
router.get('/overdue', borrowedBooksController.listOverdueBooks);

module.exports = router;
