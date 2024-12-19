const Cart = require('../models/Cart');
const FavoriteBooks = require('../models/FavoriteBook');

async function getUserCart(userId){
    try{
        const cartIems = await Cart.find({ userId});
        return cartIems.map(item => item.bookId);
    }catch(err){
        console.error(err);
        return [];
    }
}

async function getUserFavoriteBooks(userId) {
    try{
        const favoriteBooks = await FavoriteBooks.find({userId});
        return favoriteBooks.map(item => item.bookId);
    }catch(err){
        console.error(err);
        return [];
    }
    
}