const express=require("express");
const router=express.Router();
const {addProduct,getProducts,getProductById,updateProduct,deleteProduct,getUserProduct,searchProduct}=require("../../controllers/v1/productController")
router.post("/add",addProduct);
router.get("/search",searchProduct);
router.get("/",getProducts);
router.get("/:id",getProductById);
router.put("/update",updateProduct);
router.delete("/delete/:id",deleteProduct);
router.get("/userProduct/:userId",getUserProduct);
module.exports=router;