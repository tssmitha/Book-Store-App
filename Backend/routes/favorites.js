const express = require('express');
const router = express.Router();
const FavoriteBook = require('../models/FavoriteBook');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/' , authMiddleware, async(req , res) =>{
    try{
        console.log('Request body: ' , req.body);

        const userId = req.userId;
        const favorites = await FavoriteBook.find({userId}).populate('bookId');
        res.json(favorites);
    }catch(error){
        console.error('Error fetching favorites : ' , error);
        res.status(500).json({message : 'Failed to fetch favorites'});
    }
});

// POST /api/favoriteBooks - Add to favorites
router.post('/', authMiddleware, async (req, res) => {
    const { bookId, title , author , coverImage } = req.body;
    const userId = req.userId;
    console.log(userId);

     console.log('Request body: ' , req.body);

    if(!bookId || !title || !author || !coverImage){
        return res.status(400).json({message : 'All fields are required'});
    }

    try {
        const newFavorite = new FavoriteBook({
            userId,
            bookId,
            title,
            author,
            coverImage
            // Add other fields like title, author, coverImage if needed
        });

        await newFavorite.save();
        res.status(201).json(newFavorite);
    } catch (error) {
        res.status(500).json({ message:'Failed to add to favorites' });
    }
});

// DELETE /api/favoriteBooks/:bookId - Remove from favorites
router.delete('/:bookId', authMiddleware, async (req, res) => {
    const { bookId } = req.params;
    const userId = req.userId;

    try {
        const result = await FavoriteBook.findOneAndDelete({ userId, bookId });
        if(!result){
            return res.status(204).json({message : 'Favorite not found'});
        }
    } catch (error) {
        console.error('Error removing from favorites : ',error);
        res.status(500).json({ message: 'Failed to remove from favorites' });
    }
});


module.exports = router;