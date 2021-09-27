const mongoose = require('mongoose');

var inventorySchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('inventory', inventorySchema);
