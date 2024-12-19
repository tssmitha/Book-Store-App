const mongoose = require('mongoose');
const Book = require('./models/Book'); // Adjust path as necessary

async function run() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/bookstore');

        // Create a new book
        const newBook = new Book({
            title: 'Sample Book',
            author: 'John Doe',
            genre : 'romance',
            language : 'english'
            // other fields...
        });

        // Save the book
        await newBook.save();

        console.log('Book saved successfully.');
    } catch (error) {
        console.error('Error connecting to MongoDB or saving book:', error);
    } finally {
        mongoose.connection.close();
    }
}

run();
