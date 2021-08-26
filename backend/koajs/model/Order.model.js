const mongoose = require('mongoose');
const cartItem = require('./CartItem.model')

var orderSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    items: {
        type: [
            {
                productId: String,
                qty: Number,
                price: Number,
                total: Number
            }
        ],
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('order', orderSchema);
