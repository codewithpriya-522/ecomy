const dotenv=require("dotenv");
const express=require("express");
const connectDb=require("./src/config/db");
const authRouter=require("./src/routes/v1/authRouter");
const productRouter=require("./src/routes/v1/productRouter");
const cartRouter=require("./src/routes/v1/cartRouter");
//any declaration will be added in upper space
const app=express();
dotenv.config();
connectDb(process.env.DB_URL);
app.use(express.json());



//registering app routes
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/cart",cartRouter);

//any middleware declaration and rote registration will be added in upper space
const port=process.env.PORT||5000;
app.listen(port,()=>console.log(`Server is running on http://localhost:${port}`));
