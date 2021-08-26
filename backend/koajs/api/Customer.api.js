const uuid = require('uuid');
const customerSchema = require('../model/Customer.model')

const addCustomer = async obj => {
  return new Promise((resolve, reject) => {
      var newCustomerSchema = new customerSchema({
          id: obj.id,
          firstName: obj.firstName,
          lastName: obj.lastName,
          dateOfBirth: obj.dateOfBirth,
          contactNumber: obj.contactNumber,
          address: obj.address,
          emailAddress: obj.emailAddress,
          password: obj.password,
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
module.exports = {addCustomer};