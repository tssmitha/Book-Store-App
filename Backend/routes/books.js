// const express = require('express');
// const Book = require('../models/Book'); // Adjust path if needed
// const router = express.Router();

// // Handle GET requests to /api/books
// router.get('/', async (req, res) => {
//     const { query } = req.query;
//     try {
//         if (query) {
//             const books = await Book.find({
//                 title: { $regex: query, $options: 'i' } // Case-insensitive search
//             });
//             console.log('Books fetched:', books);
//             res.json(books);
//         } else {
//             // If no query parameter, return an empty array
//             const books = await Book.find();
//             res.json(books);
//         }
//     } catch (err) {
//         console.error('Error searching for books:', err);
//         res.status(500).json({ message: 'Error searching for books' });
//     }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Book = require('../models/Book');

// // Handle GET requests to /api/books
// router.get('/', async (req, res) => {
//     const { page = 1, limit = 10 } = req.query;
//     const skip = (page - 1) * limit;
//     try {
//         const totalBooks = await Book.countDocuments(); // Total number of books
//         const books = await Book.find()
//             .skip(parseInt(skip))
//             .limit(parseInt(limit))
//             .exec();
//         res.json({
//             books,
//             totalPages: Math.ceil(totalBooks / limit),
//         });
//     } catch (err) {
//         console.error('Error fetching books:', err);
//         res.status(500).json({ message: 'Error fetching books' });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Handle GET requests to /api/books
router.get('/', async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    
    // Validate and parse page and limit
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    if (page < 1) page = 1;
    if (limit < 1) limit = 10;  // Default limit if not provided

    const skip = (page - 1) * limit;

    try {
        const totalBooks = await Book.countDocuments(); // Total number of books
        const books = await Book.find()
            .skip(skip)
            .limit(limit)
            .exec();
        
        res.json({
            books,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: page,
        });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Error fetching books' });
    }
});

module.exports = router;
