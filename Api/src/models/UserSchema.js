const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    userName:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    contactNo:String,
    password:{type:String,required:true},
    address:String,
    isActive:{type:Boolean,default:true},
    dateOfBirth:Date
},{timestamps:true,});
const UserModel=mongoose.model("User",UserSchema);
module.exports=UserModel;