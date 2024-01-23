const { BorrowedBook, Book, Borrower } = require('../models');
const { Op } = require('sequelize');

const checkOutBook = async (req, res) => {
  try {
    const { due_date, borrower_id, book_id } = req.body;

    // Check if book is available
    const availableBook = await Book.findOne({
      where: { id: book_id, quantity: { [Op.gt]: 0 } },
    });

    if (!availableBook) {
      return res.status(400).json({ error: 'This book is not available for checkout.' });
    }

    // Check if borrower exists
    const borrower = await Borrower.findByPk(borrower_id);
    if (!borrower) {
      return res.status(400).json({ error: 'Borrower not found.' });
    }

    // Decrement book quantity and create borrowed book record
    await Book.decrement('quantity', { where: { id: book_id } });
    const borrowedBook = await BorrowedBook.create({ due_date, borrower_id, book_id });

    res.json(borrowedBook);
  } catch (error) {
    console.error('Failed to check out book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Lists ALL borrowed books
const listBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await BorrowedBook.findAll({});
    res.json(borrowedBooks);
  } catch (error) {
    console.error('Failed to list borrowed books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Return book by borrowed book ID
const returnBook = async (req, res) => {
  try {
    const borrowedBookId = req.params.id;

    // Fetch borrowed book
    const borrowedBook = await BorrowedBook.findByPk(borrowedBookId);

    if (!borrowedBook) {
      return res.status(404).json({ error: 'Borrowed book not found.' });
    }

    // Increment book quantity and destroy borrowed book record
    await Book.increment('quantity', { where: { id: borrowedBook.book_id } });
    await borrowedBook.destroy();

    res.json({ message: 'Book returned successfully.' });
  } catch (error) {
    console.error('Failed to return book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Lists ALL overdue books
const listOverdueBooks = async (req, res) => {
  try {
    
    const currentDate = new Date();
    // Compare borrowed book due date with current date.
    const overdueBooks = await BorrowedBook.findAll({
      where: {
        due_date: { [Op.lt]: currentDate },
      },
    });

    res.json(overdueBooks);
  } catch (error) {
    console.error('Failed to list overdue books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  checkOutBook,
  listBorrowedBooks,
  returnBook,
  listOverdueBooks,
};
