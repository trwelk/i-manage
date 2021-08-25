const orderApi = require('../api/Order.api');
const Router = require('@koa/router');

const router = new Router({
    prefix: '/orders'
});


//call this to get all the order
router.get('/', async ctx => {
    let orders = await orderApi.getOrders()
        .catch(error => {
            ctx.throw(400,'error',error);
        });
    ctx.body = orders
});

router.get('/:orderId', async ctx => {
    const orderId = ctx.params.orderId;
    ctx.body = await orderApi.getOrder(orderId);
});

router.put('/', async ctx => {
    let order = ctx.request.body;
    order = await orderApi.updateOrder( order );
    ctx.response.status = 201;
    ctx.body = order;
   });

//call this to add a new order 
router.post('/', async ctx => {
    let order = ctx.request.body;
    order = await orderApi.addOrder( order )
    .catch(error => {
        ctx.throw(404,error);
    });
    ctx.response.status = 201;
    ctx.body = order;
});

   //Used to delete a order
router.delete('/:id', async ctx => {
    let orderId = ctx.params.id;
    ctx.body = await orderApi.deleteOrder( orderId )
        .catch(error => {
            ctx.throw(404,error);
        })
})

module.exports = router;