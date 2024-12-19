const mongoose = require('mongoose');

const favoriteBookSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    bookId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Book',
        required : true
    },
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    coverImage : {
        type : String,
        required : true
    }
},{timestamps : true});

const FavoriteBook = mongoose.model('FavoriteBook' , favoriteBookSchema);

module.exports = FavoriteBook;