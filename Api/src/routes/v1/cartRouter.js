const express = require("express")
const {addToCart} = require('../../controllers/v1/cartController');
const cartRouter=express.Router();
cartRouter.post('/add',(req, res, next) => {
    console.log(`Request Url ${req.originalUrl} ReuestBody: ${JSON.stringify(req.body)}`);
    next();
},addToCart);

cartRouter.get('/', (req, res)=> {
    res.send("Hello")
})
module.exports=cartRouter;