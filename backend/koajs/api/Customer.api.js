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
      let check = await User.findOne({ emailAddress: userName})
      if(check){
        newCustomerSchema.catch(error => {
          reject(error)
      })
      }
      else{
        newCustomerSchema.save()
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
      }
      
  })
}
async function userLogin(userName,userPassword) {
  let user = await User.findOne({ emailAddress: userName, password: userPassword }, function(err, response){
      if(err){
          console.log("Invalid User Details");
          return false;
      }
      else{
          return response
      }
   });

  let res = {
      "logged": false
  }

   if(user){
       res = {
          "id": user.id,
          "firstName": user.firstName,
          "lastName": user.lastName,
          "dateOfBirth": user.dateOfBirth,
          "contactNumber": user.contactNumber,
          "address": user.address,
          "emailAddress": user.emailAddress,
          "logged": true
       }
   }
   return res;
}
async function deleteUser(userId) {
  console.log(userId);
  let deleteDetails = await User.deleteOne({ id: userId }, function(err, response){
      if(err)
          console.log('Unable to delete user');
      else{
          return response;
      }
   });
   return deleteDetails;
}
async function updateUser(user) {
  var filter = {emailAddress: user.emailAddress, password: user.password};
  var oldUser = await this.getUser(user.username);
  user.id = oldUser.id;
  let updatedUser = await User.findOneAndReplace(filter,user, {
      new: true
  });
  return updatedUser;
}
async function getUser(email) {
  let user = await User.findOne({emailAddress: email}, function(err,response) {
      if(err)
          console.log(err);
      else
          return response;
  })

   return user;
}

module.exports = {addCustomer,userLogin,deleteUser,updateUser,getUser};