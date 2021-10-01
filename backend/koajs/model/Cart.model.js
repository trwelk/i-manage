const mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    items: {
        type: [
            {
                id: String,
                productName: String,
                image: String,
                qty: Number,
                price: Number
            }
        ],
        required: true
    }
});

module.exports = mongoose.model('carts', cartSchema);
