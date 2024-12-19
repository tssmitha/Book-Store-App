require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const axios = require('axios');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth' , require('./routes/auth'));
app.use('/api/books' , require('./routes/books'));
app.use('/api/protected', require('./routes/protected'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/cart' , require('./routes/cart'));

app.get('/api/recommendations' , async(req,res)=>{
    const { title } = req.query;

    try{
        const resonse = await axios.get(`http://localhost:8000/recommend?title=${encodeURIComponent(title)}`);
        res.json(response.data);
    }catch(error){
        console.log('Error fetching recommendations:',error);
        res.status(500).json({error : 'Error fetching recommendations from the recommendation service'});
    }
});

app.get('/',(req,res) =>{
    res.send("Welcome to personalized book store!")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`server is running on port ${PORT}`));