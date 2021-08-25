const mongoose = require('mongoose');

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
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('order', orderSchema);
