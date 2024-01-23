// Script used to populate the database with random borrowers.
// USE RESPONSIBLY!!!!!


const { Borrower } = require('../models');

async function populateBorrowers(numberOfBorrowers) {
  try {
    const borrowers = [];

    for (let i = 0; i < numberOfBorrowers; i++) {
      borrowers.push({
        name: `Borrower ${i + 1}`,
        email: `borrower${i + 1}@example.com`,
        registered_date: new Date().toISOString().split('T')[0], // Current date in 'YYYY-MM-DD' format
      });
    }

    await Borrower.bulkCreate(borrowers);

    console.log(`Successfully inserted ${numberOfBorrowers} borrowers into the database.`);
  } catch (error) {
    console.error('Error populating borrowers:', error);
  }
}

// Change the parameter to the number of borrowers you want
populateBorrowers(50);
