const { SendErrorResponse, SendSuccessResponse } = require("../../helper/responseHelper");
const CartModel = require("../../models/CartSchema");

const addToCart = async (req, res) => {
    try {
        const { userId, products } = req?.body;

        // Check if a cart already exists for the user
        const previousCart = await CartModel.findOne({ userId });

        if (previousCart) {
            // Update the quantity if the product already exists in the cart
            products.forEach((item) => {
                const existingProduct = previousCart.products.find(p => p.productId.toString() === item.productId.toString());
                if (existingProduct) {
                    existingProduct.quantity += item.quantity;
                } else {
                    // If a new product, push it to the cart
                    previousCart.products.push(item);
                }
            });

            // Save the updated cart
            const result = await previousCart.save();
            return SendSuccessResponse(res, "Cart updated successfully.", result);
        } else {
            // Create a new cart and add products
            const cart = new CartModel({
                userId,
                products
            });
            const result = await cart.save();
            return SendSuccessResponse(res, "Cart created successfully.", result);
        }
    } catch (error) {
        return SendErrorResponse(res, "Failed to create or update cart!", error);
    }
};
module.exports = {addToCart};