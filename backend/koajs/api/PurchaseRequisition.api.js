const uuid = require('uuid');
const purchaseRequisitionSchema = require('../model/PurchaseRequisition.model')
const productApi = require('../api/Product.api')
const supplierApi = require('../api/Supplier.api')
const inventoryApi = require('../api/Inventory.api')
const mailApi = require('../api/mail.api');
const fManEmail = "weerasooriya.trewon@gmail.com"


/*Inserts a new purchaseRequisitionLocation entity into the database and returns the object if successfull : else returns the error 
  Catch this error from where it's called and throw an error*/
  const addPurchaseRequisition = async obj => {
    return new Promise( async (resolve, reject) => {
        var product = await productApi.getProductByKey(obj.product);
        var newPurchaseRequisitionSchema = new purchaseRequisitionSchema({
            id: obj.id,
            description: obj.description,
            product: obj.product,
            supplier: obj.supplier,
            requester: obj.requester,
            location: obj.location,
            requestedDate:obj.requestedDate,
            wantedDeliveryDate: obj.wantedDeliveryDate,
            state: "REQUESTED",
            quantityOfItems:obj.quantityOfItems,
            dateResolved:new Date(),
         });

        newPurchaseRequisitionSchema.save()
            .then(response => {
                mailApi.sendMail(
                    "PR Created",
                    "PR for " + obj.id + " Created",
                    fManEmail)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}


/*Fetches all the purchaseRequisitionLocations and returns a json array of purchaseRequisitionLocations.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
async function getPurchaseRequisitions() {
    return new Promise((resolve, reject) => {
        purchaseRequisitionSchema.find(null, function (err, response) {
            if (err)
                reject(err)
            else {
                resolve(response);
            }
        });
    })

}


/*Fetches all the purchaseRequisitionLocations for a given category and returns a json array of purchaseRequisitionLocations.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
async function getPurchaseRequisitionsByCategory(category) {
    const query = { categories: category }
    return new Promise((resolve, reject) => {
        purchaseRequisitionSchema.find(query,function(err, response){
            if(err)
                reject(err)
            else{
                resolve(response)
            }
         });
    })

}

/*Fetches all the purchaseRequisitionLocations for a given category and returns a json array of purchaseRequisitionLocations.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
  async function getPurchaseRequisitionById(id) {
    const query = { id: id }
    return new Promise((resolve, reject) => {
        purchaseRequisitionSchema.find(query,function(err, response){
            if(err){
                reject(err)
            }
            else{
                resolve(response)
            }
         });
    })

}

async function deletePurchaseRequisition( purchaseRequisitionId ) {
    return new Promise((resolve, reject) => {
        var query = { id: purchaseRequisitionId };
        purchaseRequisitionSchema.deleteOne(query,function(err, response) {
            if (err) {
                reject(err)
            }
            resolve(response)
          });
    })
   
}


async function updatePurchaseRequisition( purchaseRequisition ) {
    var filter = {id: purchaseRequisition.id};
    var oldRecord = await getPurchaseRequisitionById(purchaseRequisition.id);
  
    console.log("OLD RECORD",oldRecord)
    console.log("NEW RECORD",purchaseRequisition)

    let updatedPurchaseRequisition = await purchaseRequisitionSchema.findOneAndReplace(filter, purchaseRequisition, {
        new: true
    });
    if(oldRecord[0].state == 'REQUESTED' && purchaseRequisition.state == 'APPROVED'){
        console.log("CREATING INVENTORY RECORD")
        await inventoryApi.addInventory(
            {
                id:purchaseRequisition.id,
                quantity:purchaseRequisition.quantityOfItems,
                location:purchaseRequisition.location,
                product:purchaseRequisition.product,
            }
        ).catch(error => {
            console.log("ERROR" , error)
        })
        const product = await productApi.getProductByKey(purchaseRequisition.product)
        const supplier = await supplierApi.getSupplierByKey(product[0].supplier)
        console.log("Supplier" , supplier)
        mailApi.sendMail(
            "PURCHASE ORDER",
            "PO for " + purchaseRequisition.quantityOfItems + " items of " + purchaseRequisition.product,
            supplier[0].contactEmail)
        
    }
    return updatedPurchaseRequisition;
}
module.exports = {updatePurchaseRequisition, addPurchaseRequisition, getPurchaseRequisitionsByCategory, getPurchaseRequisitions ,deletePurchaseRequisition };