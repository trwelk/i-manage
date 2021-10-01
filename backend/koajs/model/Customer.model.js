var mongoose = require('mongoose');


var customerSchema  = mongoose.Schema({
    id : {
      type: String,
      required: true
    },
    firstName : {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    dateOfBirth : {
      type: Date,
      required: true
    },
    contactNumber : {
      type: String,
      required: true
    },
    address : {
      type: String,
      required: false
    },
    emailAddress : {
      type: String,
      required: true
    },
    password : {
      type: String,
      required: true
    },
    type: {
      type:String,
      required: true
    }
});


module.exports = mongoose.model('customer', customerSchema);