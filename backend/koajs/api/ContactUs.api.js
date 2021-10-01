const uuid = require('uuid');
const contactUs = require('../model/ContactUs.model')

const addContactUs = async obj => {
  
  return new Promise((resolve, reject) => {
      var newCustomerSchema = new contactUs({
          id: uuid.v4(),
          emailAddress: obj.emailAddress,
          topic: obj.topic,
          description : obj.description,
          type : obj.type,
      });

      newCustomerSchema.save()
      .then(response => {
          resolve(response)
      })
      .catch(error => {
          reject(error)
      })
  })

}


module.exports = {addContactUs};