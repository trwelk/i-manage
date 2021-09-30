const uuid = require('uuid');
const productSchema = require('../model/Product.model')
// const mailApi = require('../api/mail.api');


/*Inserts a new productLocation entity into the database and returns the object if successfull : else returns the error 
  Catch this error from where it's called and throw an error*/
  const addProduct = async obj => {
    return new Promise((resolve, reject) => {
        var newProductSchema = new productSchema({
            id: obj.id,
            productName: obj.productName,
            brand: obj.brand,
            model: obj.model,
            type: obj.type,
            supplier: obj.supplier,
            buyingPrice: obj.buyingPrice,
            sellingPrice: obj.sellingPrice,

        });

        newProductSchema.save()
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}


/*Fetches all the productLocations and returns a json array of productLocations.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
async function getProducts() {
    return new Promise((resolve, reject) => {
        productSchema.find(null, function (err, response) {
            if (err)
                reject(err)
            else {
                resolve(response);
            }
        });
    })

}


/*Fetches all the productLocations for a given category and returns a json array of productLocations.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
async function getProductsByCategory(category) {
    const query = { categories: category }
    return new Promise((resolve, reject) => {
        productSchema.find(query,function(err, response){
            if(err)
                reject(err)
            else{
                resolve(response)
            }
         });
    })

}

/*Fetches all the productLocations for a given category and returns a json array of productLocations.model type objects  : else returns the error 
  Catch this error from where it's called and  throw an error*/
  async function getProductByKey( id ) {
    const query = { id: id }
    return new Promise((resolve, reject) => {
        productSchema.find(query,function(err, response){
            if(err)
                reject(err)
            else{
                resolve(response)
            }
         });
    })

}

async function deleteProduct( productId ) {
    return new Promise((resolve, reject) => {
        var query = { id: productId };
        productSchema.deleteOne(query,function(err, response) {
            if (err) {
                reject(err)
            }
            resolve(response)
          });
    })
   
}


async function updateProduct( product ) {
    var filter = {id: product.id};
    let updatedProduct = await productSchema.findOneAndReplace(filter,product, {
        new: true
    });
    return updatedProduct;
}
module.exports = {updateProduct, addProduct, getProductByKey, getProductsByCategory, getProducts ,deleteProduct };