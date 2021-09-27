const purchaseRequisitionApi = require('../api/PurchaseRequisition.api');
const Router = require('@koa/router');

const router = new Router({
    prefix: '/purchaseRequisitions'
});

//call this to get all the purchaseRequisition
router.get('/', async ctx => {
    let purchaseRequisition = await purchaseRequisitionApi.getPurchaseRequisitions()
        .catch(error => {
            ctx.throw(400,'error',error);
        });
    ctx.body = purchaseRequisition
});

router.put('/', async ctx => {
    let purchaseRequisition = ctx.request.body;
    purchaseRequisition = await purchaseRequisitionApi.updatePurchaseRequisition( purchaseRequisition );
    ctx.response.status = 201;
    ctx.body = purchaseRequisition;
   });

//call this to add a new purchaseRequisition 
router.post('/', async ctx => {
    let purchaseRequisition = ctx.request.body;
    purchaseRequisition = await purchaseRequisitionApi.addPurchaseRequisition( purchaseRequisition )
    .catch(error => {
        ctx.throw(404,error);
    });
    ctx.response.status = 201;
    ctx.body = purchaseRequisition;
});

   //Used to delete a purchaseRequisition
router.delete('/:id', async ctx => {
    let purchaseRequisitionId = ctx.params.id;
    ctx.body = await purchaseRequisitionApi.deletePurchaseRequisition( purchaseRequisitionId )
        .catch(error => {
            ctx.throw(404,error);
        })
})

module.exports = router;