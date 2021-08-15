const mongoose = require('mongoose');

var inventoryLocationSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true
    },
    locationDescription: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    manager:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('inventory_location', inventoryLocationSchema);
