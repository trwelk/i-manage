const mongoose = require('mongoose');
const ProductModel = require('./Product.model');

var cartItemSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    item: {
        type: ProductModel,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('cartItem', cartItemSchema);
