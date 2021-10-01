const mongoose = require('mongoose');

var contactSchema = mongoose.Schema({
  id: {
      type: String,
      required: true
  },
  emailAddress: {
      type: String,
      required: true
  },
  topic: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },

});

module.exports = mongoose.model('contactus', contactSchema);