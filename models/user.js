const mongoose = require('mongoose');
const { Place } = require('./location');

/* User schema */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    wards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }],
    visited_locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place', default: null }],
    password: {
        type: String, required: true,
        created_at: { type: Date, defualt: Date.now },
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;