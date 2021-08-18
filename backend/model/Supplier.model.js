const mongoose = require('mongoose');

var supplierSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    Note: {
        type: String,
        required: false
    },
    contractDate: {
        type: Date,
        required: true
    },
    contractExpDate: {
        type: Date,
        required: true
    },
    methodOfContact: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    currencyCode: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('supplier', supplierSchema);
