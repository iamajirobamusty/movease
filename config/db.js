const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/movease");
        console.log('connected');

    } catch (err) {
        console.error('Could not connect', err.message)
        process.exit(1);
    }
};

module.exports = connectDB;