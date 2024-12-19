const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('./profile' , authMiddleware, (req,res) =>{
    res.join({mmsg : 'This is a protected route' , user : req.user});
});

module.exports = router;
