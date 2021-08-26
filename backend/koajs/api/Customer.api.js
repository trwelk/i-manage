const uuid = require('uuid');
const customerSchema = require('../model/Customer.model')

/*Inserts a new Customer entity into the database and returns the object if successfull : else returns the error 
  Catch this error from where it's called and throw an error*/

const addCustomer = async obj => {
  return new Promise((resolve, reject) => {
      var newCustomerSchema = new customerSchema({
          id: uuid.v4(),
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