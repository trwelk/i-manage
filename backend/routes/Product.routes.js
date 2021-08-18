const productApi = require('../api/Product.api');
const Router = require('@koa/router');

const router = new Router({
    prefix: '/products'
});


//call this to get all the product
router.get('/', async ctx => {
    let product = await productApi.getProducts()
        .catch(error => {
            ctx.throw(400,'error',error);
        });
    ctx.body = product
});

router.put('/', async ctx => {
    let product = ctx.request.body;
    product = await productApi.updateProduct( product );
    ctx.response.status = 201;
    ctx.body = product;
   });

//call this to add a new product 
router.post('/', async ctx => {
    let product = ctx.request.body;
    product = await productApi.addProduct( product )
    .catch(error => {
        ctx.throw(404,error);
    });
    ctx.response.status = 201;
    ctx.body = product;
});

   //Used to delete a product
router.delete('/:id', async ctx => {
    let productId = ctx.params.id;
    ctx.body = await productApi.deleteProduct( productId )
        .catch(error => {
            ctx.throw(404,error);
        })
})

module.exports = router;