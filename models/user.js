const mongoose = require('mongoose');


/* User schema */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: [true, 'Email must be unique'] },
    password: { type: String, required: [true, 'password must contain at least One uppercase letter, One special character, One symbols and must be greater than 8 characters'] },
    created_at: { type: Date, defualt: Date.now },
});

const User = mongoose.model('User', userSchema);
module.exports = User;