const inventoryApi = require('../api/Inventory.api');
const Router = require('@koa/router');

const router = new Router({
    prefix: '/inventory'
});


//call this to get all the inventory
router.get('/', async ctx => {
    let inventory = await inventoryApi.getInventory()
        .catch(error => {
            ctx.throw(400,'error',error);
        });
    ctx.body = inventory
});

router.put('/', async ctx => {
    let inventory = ctx.request.body;
    inventory = await inventoryApi.updateInventory( inventory );
    ctx.response.status = 201;
    ctx.body = inventory;
   });

//call this to add a new inventory 
router.post('/', async ctx => {
    let inventory = ctx.request.body;
    inventory = await inventoryApi.addInventory( inventory )
    .catch(error => {
        ctx.throw(404,error);
    });
    ctx.response.status = 201;
    ctx.body = inventory;
});

   //Used to delete a inventory
router.delete('/:id', async ctx => {
    let inventoryId = ctx.params.id;
    ctx.body = await inventoryApi.deleteInventory( inventoryId )
        .catch(error => {
            ctx.throw(404,error);
        })
})

module.exports = router;