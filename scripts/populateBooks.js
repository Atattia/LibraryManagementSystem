// Script used to populate the database with random book values.
// USE RESPONSIBLY!!!!!

const { Book } = require('../models');

async function populateBooks(numberOfBooks) {
  try {
    const books = [];

    for (let i = 0; i < numberOfBooks; i++) {
      books.push({
        title: `Book ${i + 1}`,
        author: `Author ${i + 1}`,
        isbn: Math.floor(Math.random() * 1000000000000).toString(),
        quantity: Math.floor(Math.random() * 100) + 1,
        shelf_location: `Shelf ${String.fromCharCode(65 + i % 26)}${Math.floor(i / 26) + 1}`,
      });
    }

    await Book.bulkCreate(books);

    console.log(`Successfully inserted ${numberOfBooks} books into the database.`);
  } catch (error) {
    console.error('Error populating books:', error);
  }
}

// Change the paramter to the number of random books to generate
populateBooks(100);
