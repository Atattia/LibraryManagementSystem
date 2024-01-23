# Library Management System

## Overview

This project implements a simple Library Management System using Node.js with Express and Sequelize for the backend, and PostgreSQL as the relational database. The system allows users to manage books, borrowers, and borrowing processes. It includes features such as adding books, registering borrowers, checking out and returning books, and listing overdue books.

## Requirements

- Node.js (v14 or higher)
- PostgreSQL

## Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Atattia/LibraryManagementSystem.git
   cd LibraryManagementSystem
2. **Install Dependencies:**
   ```bash
   npm install
3. **Create PostgreSQL Database:**
   
        Create a PostgreSQL database and configure the connection in config/config.json 
  
4. **Run Migrations:**
  ```bash
  npx sequelize-cli db:migrate
  ```
5. **Seed the Database with Sample Data (Optional):**
   ```bash
    npx sequelize-cli db:seed:all
   ```

6. **Run the Application:**
    ```bash
    node app.js
    ```

from there, the server will start on http://localhost:3000

## API Endpoints
### Books
1. GET /books: List all books.

2. POST /books: Add a new book.
   
Request Body:
```
{
  "title": "Sample Book",
  "author": "John Doe",
  "isbn": "1234567890",
  "quantity": 10,
  "shelf_location": "A1"
}
```

3. PUT /books/:id: Update details of a specific book by ID.
Request Body:
{
  "title": "Updated Book Title"
}


4. DELETE /books/:id: Delete a specific book by ID.

5. GET /books/search: Search for books by title, author, or ISBN.

Query Parameters:
title: Title of the book.
author: Author of the book.
isbn: ISBN of the book.

### Borrowers
1. GET /borrowers: List all borrowers.

2. GET /borrowers/:id: Get details of a specific borrower.

3. POST /borrowers: Register a new borrower.

Request Body:


```
{
  "name": "John Doe",
  "email": "john@example.com",
  "registered_date": "2024-01-20"
}
```

4. PUT /borrowers/:id: Update details of a specific borrower.

Request Body:
```
{
  "name": "Updated Borrower Name"
}
```

5. DELETE /borrowers/:id: Delete a specific borrower.

### Borrowing Process
1. POST /borrowed_books: Check out a book.

Request Body:

```
{
  "due_date": "2024-02-20",
  "borrower_id": 1,
  "book_id": 1
}
```
2. GET /borrowed_books: List all borrowed books.

3. DELETE /borrowed_books/:id: Return a specific borrowed book.

4. GET /borrowed_books/overdue: List overdue books.

## Schema
This is a textual representation of the schematas for created databases.

### Books Table
id (PK),
title,
author,
isbn,
quantity,
shelf_location


### Borrowers Table
id (PK),name,email,registered_date

### BorrowedBooks Table
id (PK),due_date,
returned_date,
borrower_id (Foreign Key -> Borrowers Table),
book_id (Foreign Key -> Books Table)
