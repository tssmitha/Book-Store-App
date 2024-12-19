const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    genre : {
        type : String,
        required : true,
    },
    description : {
        type : String,
    },
    language : {
        type : String,
        required : true,
    },
    coverImage : {
        type : String , //url jfor coverimage
    },
    price : {
        type : Number,
    },
    availableCopies : {
        type : Number,
        default : 1,
    },
    publishedDate : {
        type : Date,
    },
});

const Book = mongoose.model('Book' , BookSchema);

module.exports = Book;