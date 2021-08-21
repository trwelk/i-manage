const cartApi = require('../api/Cart.api');
const Router = require('@koa/router');

const router = new Router({
    prefix: '/cart'
});


//call this to get all the cart
router.get('/', async ctx => {
    let userid = ctx.request.body;
    let cart = await cartApi.getUserCart(userid)
        .catch(error => {
            ctx.throw(400,'error',error);
        });
    ctx.body = cart
});

router.put('/', async ctx => {
    let cart = ctx.request.body;
    cart = await cartApi.updateCart(cart);
    ctx.response.status = 201;
    ctx.body = cart;
   });

//call this to add a new cart 
router.post('/', async ctx => {
    let cart = ctx.request.body;
    cart = await cartApi.addCart(cart)
    .catch(error => {
        ctx.throw(404,error);
    });
    ctx.response.status = 201;
    ctx.body = cart;
});

   //Used to delete a cart
router.delete('/:id', async ctx => {
    let cartId = ctx.params.id;
    ctx.body = await cartApi.deleteCart( cartId )
        .catch(error => {
            ctx.throw(404,error);
        })
})

module.exports = router;