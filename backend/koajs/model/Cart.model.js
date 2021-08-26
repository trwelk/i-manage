const mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: {
        type: [String],
        required: true
    },
    qty: {
        type: [String],
        required: true
    },
    total: {
        type: Number,
        required: false
    },
    itemCount: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('cart', cartSchema);
