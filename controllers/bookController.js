const { Book } = require('../models');
const { Op } = require('sequelize');

const addBook = async (req, res) => {
  try {
    console.log(req.body);

    // Sequelize create entry
    const book = await Book.create(req.body);
    res.json(book);
    res.json({ message: 'Book added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateBook = async (req, res) => {
  try {
    // Sequelize find by ID
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found, make sure ID is correct' });
    }

    await book.update(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Lists ALL books
const listBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Search by title, author or ISBN
const searchBooks = async (req, res) => {
  try {
    const { title, author, isbn } = req.query;

    // Construct a whereCondition to pass to Sequelize
    const whereCondition = {};
    if (title) whereCondition.title = { [Op.iLike]: `%${title}%` };
    if (author) whereCondition.author = { [Op.iLike]: `%${author}%` };
    if (isbn) whereCondition.isbn = { [Op.iLike]: `%${isbn}%` };
    // Check if search parameters are valid
    if (!title && !author && !isbn) {
      return res.json([]); // Return an empty array if search parameters are not valid
    }
    const books = await Book.findAll({ where: whereCondition });
    res.json(books);
  } catch (error) {
    console.error('Error while searching:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  listBooks,
  searchBooks,
};