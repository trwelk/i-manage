const mongoose = require('mongoose');
const CartItemModel = require('./CartItem.model');

var cartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: [CartItemModel],
        required: false
    }
});

module.exports = mongoose.model('cart', cartSchema);
