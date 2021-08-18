const mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    supplier: {
        type: String,
        required: true
    },
    buyingPrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('product', productSchema);
