const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',authMiddleware,async(req,res) =>{
    const {bookId , quantity} = req.body;
    const userId = req.userId;

    try{
        let cartItem = await Cart.findOne({userId , bookId});
        if(cartItem){
            cartItem.quantity += quantity;
            await cartItem.save();
        }
        else{
            cartItem = new Cart({userId , bookId , quantity});
            await cartItem.save();
        }
        res.status(201).json(cartItem);
    }catch(error){
        res.status(500).json({message : 'Failed to add to cart'});
    }
});

router.delete('/:bookId' , authMiddleware, async(req,res)=>{
    const {bookId} = req.params;
    const userId = req.userId;

    try{
        const result = await Cart.findOneAndDelete({userId , bookId});
        if(!result){
            return res.status(404).json({message : 'Item not found'});
        }
        res.status(200).json({message : 'Item removed from the cart'});
    }catch(error){
        res.status(500).json({message : "Failed to remove item from the cart"});
    }
});

router.get('/',authMiddleware,async(req,res) =>{
    const userId = req.userId;

    try{
        const cartItems = await Cart.find({userId}).populate('bookId');
        res.json(cartItems);
    }catch(error){
        res.status(500).json({message : "Failed to fetch cart items"});
    }
});

module.exports = router;