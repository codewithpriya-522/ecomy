const mongoose=require("mongoose");
const ProductSchema=new mongoose.Schema({
    productName:{type:String,required:true,unique:true},
    productDescription:{type:String,required:true},
    productPrice:{type:Number,required:true},
    productImage:String,
    productColor:String,
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},{timestamps:true});

const ProductModel=mongoose.model("Product",ProductSchema);
module.exports=ProductModel;