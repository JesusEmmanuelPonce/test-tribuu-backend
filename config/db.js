const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        console.log("Connected");
        
    } catch (err) {
        console.log("[connection]", err);
    }
}

module.exports = connectDB;