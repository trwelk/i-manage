const mongoose = require('mongoose');

var inventorySchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    locationId: {
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
    stockBuyingPrice:{
        type: Number,
        required:true
    },
    stockSellingPrice:{
        type:Number,
        required: true
    },
    
});

module.exports = mongoose.model('inventory', inventorySchema);
