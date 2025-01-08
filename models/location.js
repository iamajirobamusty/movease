const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const placeSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String,
    location: {
        locationSchema,
        required: true
    }
});


const Place = mongoose.model('Place', placeSchema);


module.exports = Place;

