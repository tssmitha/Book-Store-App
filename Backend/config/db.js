const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/bookstore');
        console.log(`MongoDB connected : ${conn.connection.host}`);
    }
    catch(err){
        console.error('MongoDB connection error :', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;