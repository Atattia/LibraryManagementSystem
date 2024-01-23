const { Borrower } = require('../models');

// Register borrower and display their details
const registerBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.create(req.body);
    res.json(borrower);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update borrowed respond with new details
const updateBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findByPk(req.params.id);
    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found' });
    }

    await borrower.update(req.body);
    res.json(borrower);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Find borrower and destroy their record
const deleteBorrower = async (req, res) => {
  try {
    const borrower = await Borrower.findByPk(req.params.id);
    if (!borrower) {
      return res.status(404).json({ error: 'Borrower not found' });
    }

    await borrower.destroy();
    res.json({ message: 'Borrower deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// List ALL borrowers
const listBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.findAll();
    res.json(borrowers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  registerBorrower,
  updateBorrower,
  deleteBorrower,
  listBorrowers,
};