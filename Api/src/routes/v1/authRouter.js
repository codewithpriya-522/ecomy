const express=require("express");
const router=express.Router();
const {registerUser,login,changePassword}=require("../../controllers/v1/authController");
router.post("/register",registerUser);
router.post("/login",login);
router.put("/change-password",changePassword);
module.exports=router;