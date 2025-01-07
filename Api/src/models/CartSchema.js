const mongoose = require("mongoose");
const ProductModel = require("./ProductSchema");
const CartSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    products:[{
        productId:{type:mongoose.Types.ObjectId,ref:'Product',required:true},
        quantity:{type:Number,required:true},
    }],
    cartValue:{type:Number,default:0}
},{timestamps:true});

// middleware to auto calculate  for cart value
CartSchema.pre('save', async function (next) {
    try {
        let totalValue = 0;

        // Calculate the total value of the cart by fetching each product's price
        for (const product of this.products) {
            const data = await ProductModel.findById(product.productId);
            if (data) {
                totalValue += data.productPrice * product.quantity;
            }
        }

        this.cartValue = totalValue;
        next();
    } catch (error) {
        next(error); // Pass the error to the next middleware
    }
});



const CartModel=mongoose.model('Cart',CartSchema);
module.exports=CartModel;