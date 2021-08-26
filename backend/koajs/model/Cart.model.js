const mongoose = require('mongoose');
const cartItem = require('./CartItem.model')

var cartSchema = mongoose.Schema({
    userId: {
        type: String,
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
        required: false
    },
    itemCount: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('cart', cartSchema);
