const ProductModel = require("../../models/ProductSchema");
const {
    SendErrorResponse,
    SendResponse,
    SendSuccessResponse,
    SendBadRequest,
    SendPagedResult,
} = require("../../helper/responseHelper");
const addProduct = async (req, res) => {
    try {
        const {
            productName,
            productDescription,
            productPrice,
            productColor,
            productImage,
            createdBy,
        } = req.body;
        const product = new ProductModel({
            productName,
            productDescription,
            productPrice,
            productColor,
            productImage,
            createdBy,
        });
        await product.save();
        // res.status(201).json({ message: "Product Added Successfully" });
        return SendResponse(
            res,
            "Product Added Successfully",
            201,
            null,
            null,
            true
        );
    } catch (error) {
        // res.status(500).json({ message: error.message });
        return SendErrorResponse(res, "Failed to create product.", error);
    }
};
const getProducts = async (req, res) => {
    try {
        const page = parseInt(req?.query?.page) || 1;
        const limit = parseInt(req?.query?.limit) || 10;
        const skip = (page - 1) * limit;
        const product = await ProductModel.find().skip(skip).limit(limit);
        //res.status(200).json({ totalRows: product?.length, data: product });
        return SendPagedResult(res, undefined, {
            totalRows: product?.length,
            page,
            limit,
            data: product,
        });
    } catch (error) {
        // res.status(500).json({ message: error.message });
        return SendErrorResponse(res, "Product not found", error);
    }
};

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById(id);
        if (product === null) {
            res.status(404).json({ message: "Product Not Found", data: product });
        }
        // res.status(200).json({ message: "Product Found", data: product });
        SendSuccessResponse(res, "Product Found", product);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        return SendErrorResponse(res, "Product not found by this Id", error);
    }
};
const updateProduct = async (req, res) => {
    try {
        const {
            id,
            productName,
            productDescription,
            productPrice,
            productColor,
            productImage,
        } = req.body;
        const product = await ProductModel.findByIdAndUpdate(id, {
            productName,
            productDescription,
            productPrice,
            productColor,
            productImage,
        });
        // res.status(200).json({ message: "Updated Successfully", data: product });
        SendSuccessResponse(res, "Updated Successfully", product);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        return SendErrorResponse(res, "Failed to update", error);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await ProductModel.findByIdAndDelete(id);
        // res.status(200).json({ message: "Product Deleted Successfully" });
        SendSuccessResponse(res, "Product Deleted Successfully", product);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        return SendErrorResponse(res, "Failed to delete the product", error);
    }
};
const getUserProduct = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userProduct = await ProductModel.find({ createdBy: userId });
        if (userProduct === null) {
            // res.status(404).json({ message: "User Product Not Found For This User.", data: userProduct });
            SendBadRequest(res, "User Product Not Found For This User.");
        }
        // res.status(200).json({ message: "Product Fetched Successfully", data: userProduct });
        SendSuccessResponse(res, "Product Fetched Successfully.", userProduct);
    } catch (error) {
        // res.status(500).json({ message: error.message });
        return SendErrorResponse(res, "Product not found by this user", error);
    }
};
const searchProduct = async (req, res) => {
    try {
        const { name, maxPrice, minPrice, color, description, sortBy, order,page,limit } =
            req?.query;
        const filter = {};
        //search by name
        if (name) {
            filter.productName = {
                $regex: name, //to match a portion of name or fullName
                $options: "i", //case insensitive
            };
        }
        //search by color
        if (color) {
            filter.productColor = {
                $regex: color, //to match a portion of color
                $options: "i", //case insensitive
            };
        }
        //search by price
        if (minPrice || maxPrice) {
            filter.productPrice = {};
            if (minPrice) {
                filter.productPrice.$gte = parseInt(minPrice);
            }
            if (maxPrice) {
                filter.productPrice.$lte = parseInt(maxPrice);
            }
        }
        //defining  sorting option
        const sortOptions = {};
        if (sortBy) {
            const validSortFields = {
                name: "productName",
                price: "productPrice",
                color: "productColor",
            }; // Mapping sort fields to actual database fields

            if (validSortFields[sortBy]) {
                sortOptions[validSortFields[sortBy]] = order === "-1" ? -1 : 1;
            }
        }
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
    
        // Calculate the skip value
        const skip = (pageNumber - 1) * limitNumber;
        const products = await ProductModel.find(filter).sort(sortOptions).skip(skip).limit(Number); // Sorting products based on the provided options
        // const products = await ProductModel.find(filter).sort(sortOptions).select('productName productPrice');

        if (products.length === 0) {
            return SendBadRequest(res, "No product found");
        }
        SendPagedResult(res, "Product Fetched Successfully.",{
            totalRows:products?.length,
            page:pageNumber,
            limit:limitNumber,
            data: products,
          });
    } catch (error) {
        return SendErrorResponse(res, "Product not found.", error);
    }
};
module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getUserProduct,
    searchProduct,
};
