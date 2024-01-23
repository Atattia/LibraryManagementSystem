const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');
const borrowedBookRoutes = require('./routes/borrowedBooksRoutes');
const app = express();
const port = 3000;

app.use(bodyParser.json());

//set up routes
app.use('/books', bookRoutes);
app.use('/borrowers', borrowerRoutes);
app.use('/borrowed_books', borrowedBookRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});