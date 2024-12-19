const express = require('express');
const router = express.Router();
const FavoriteBook = require('../models/FavoriteBook');

router.get('/:userId' , async(req,res) =>{
    try{
        const {userId} = req.params;
        const favoriteBooks = await FavoriteBook.find({userId});
        res.join(favoriteBooks);
    }catch(error){
        res.status(500).json({message : 'Server erros'});
    }
});

router.post('/' , async(req,res) =>{
    try{
        const {userId , bookId , title , author , coverImage} = req.body;
        const newFavoriteBook = new FavoriteBook({userId , bookId , title , author , coverImage});
        await newFavoriteBook.save();
        res.status(201).json(newFavoriteBook);
    }catch(error){
        res.status(500).json({message : 'Server error'});
    }
});

router.delete('/:userId/:bookId' , async (req, res) =>{
    try{
        const {userId , bookId} = req.params;
        await FavoriteBook.findOneAndDelete({userId , bookId});
        res.status(200).json({message : 'Book removed from favorites'});
    }catch(error){
        res.status(500).json({message : 'Server error'});
    }
});

module.exports = router;