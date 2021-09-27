const mongoose = require('mongoose');

var purchaseRequisitionSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    supplier: {
        type: String,
        required: true
    },
    requester: {
        type: String,
        required: true
    },
    requestedDate: {
        type: Date,
        required: true
    },
    wantedDeliveryDate: {
        type: Date,
        required: false
    },
    dateResolved: {
        type: Date,
        required: false
    },
    state: {
        type: String,
        required: true
    },
    quantityOfItems: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('purchaseRequisition', purchaseRequisitionSchema);
