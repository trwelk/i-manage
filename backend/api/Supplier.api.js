const uuid = require('uuid');
const supplierSchema = require('../model/Supplier.model')
// const mailApi = require('../api/mail.api');


/*Inserts a new supplierLocation entity into the database and returns the object if successfull : else returns the error 
  Catch this error from where it's called and throw an error*/
  const addSupplier = async obj => {
    return new Promise((resolve, reject) => {
        var newSupplierSchema = new supplierSchema({
            id: obj.id,
            supplierName: obj.SupplierName,
            Note: obj.Note,
            contractDate: obj.contractDate,
            contractExpDate: obj.contractExpDate,
            contactNumber: obj.contactNumber,
            contactEmail: obj.contactEmail,
            currencyCode: obj.currencyCode,
            state: obj.state,
            rating: obj.rating,

        });

        newSupplierSchema.save()
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}


/*Fetches all the supplierLocations and returns a json array of supplierLocations.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
async function getSuppliers() {
    return new Promise((resolve, reject) => {
        supplierSchema.find(null, function (err, response) {
            if (err)
                reject(err)
            else {
                resolve(response);
            }
        });
    })

}


/*Fetches all the supplierLocations for a given category and returns a json array of supplierLocations.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
async function getSuppliersByCategory(category) {
    const query = { categories: category }
    return new Promise((resolve, reject) => {
        supplierSchema.find(query,function(err, response){
            if(err)
                reject(err)
            else{
                resolve(response)
            }
         });
    })

}

async function deleteSupplier( supplierId ) {
    return new Promise((resolve, reject) => {
        var query = { id: supplierId };
        supplierSchema.deleteOne(query,function(err, response) {
            if (err) {
                reject(err)
            }
            resolve(response)
          });
    })
   
}


async function updateSupplier( supplier ) {
    var filter = {id: supplier.id};
    let updatedSupplier = await supplierSchema.findOneAndReplace(filter, supplier, {
        new: true
    });
    return updatedSupplier;
}
module.exports = {updateSupplier, addSupplier, getSuppliersByCategory, getSuppliers ,deleteSupplier };