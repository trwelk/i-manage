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
        required: true
    },
    state: {
        type: String,
        required: true
    },
    currencyCode: {
        type: String,
        required: false
    },
    purchaseRequisition: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('purchaseRequisition', purchaseRequisitionSchema);
