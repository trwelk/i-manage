const supplierApi = require('../api/Supplier.api');
const Router = require('@koa/router');

const router = new Router({
    prefix: '/suppliers'
});


//call this to get all the supplier
router.get('/', async ctx => {
    let supplier = await supplierApi.getSuppliers()
        .catch(error => {
            ctx.throw(400,'error',error);
        });
    ctx.body = supplier
});

router.put('/', async ctx => {
    let supplier = ctx.request.body;
    supplier = await supplierApi.updateSupplier( supplier );
    ctx.response.status = 201;
    ctx.body = supplier;
   });

//call this to add a new supplier 
router.post('/', async ctx => {
    let supplier = ctx.request.body;
    supplier = await supplierApi.addSupplier( supplier )
    .catch(error => {
        ctx.throw(404,error);
    });
    ctx.response.status = 201;
    ctx.body = supplier;
});

   //Used to delete a supplier
router.delete('/:id', async ctx => {
    let supplierId = ctx.params.id;
    ctx.body = await supplierApi.deleteSupplier( supplierId )
        .catch(error => {
            ctx.throw(404,error);
        })
})

module.exports = router;