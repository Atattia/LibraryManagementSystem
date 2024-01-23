const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');

// Register a borrower
router.post('/', borrowerController.registerBorrower);

// Update a borrower's details by ID
router.put('/:id', borrowerController.updateBorrower);

// Delete a borrower by ID
router.delete('/:id', borrowerController.deleteBorrower);

// List ALL borrowers
router.get('/', borrowerController.listBorrowers);

module.exports = router;