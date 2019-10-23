const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: false
    },
    rate: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);