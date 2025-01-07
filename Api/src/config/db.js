const mongoose = require("mongoose");
const connectDb = async (connectionString) => {
    try {
        await mongoose.connect(connectionString, {
            // useNewUrlParser: true,
        });
        console.log("Mongo db connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);                                
    }
};
module.exports=connectDb;