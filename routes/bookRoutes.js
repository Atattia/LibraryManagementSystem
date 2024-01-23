const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
// Add a book
router.post('/', bookController.addBook);

// Update a book by ID
router.put('/:id', bookController.updateBook);

// Delete a book by ID
router.delete('/:id', bookController.deleteBook);

// List ALL books
router.get('/', bookController.listBooks);

// Search books by providing title or author or ISBN in request query
router.get('/search', bookController.searchBooks);

module.exports = router;