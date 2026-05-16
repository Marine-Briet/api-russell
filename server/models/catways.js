const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Le numéro de catway est requis']
    },
    catwayType: {
        type: String,
        trim: true,
        required: [true, 'Le type de catway est requis'],
        enum: ['long', 'short']
    },
    catwayState: {
        type: String,
        trim: true,
        required: [true, 'L état du catway est requis'],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Catway', Catway);