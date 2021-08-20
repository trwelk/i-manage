const inventoryLocationApi = require('../api/InventoryLocation.api');
const Router = require('@koa/router');

const router = new Router({
    prefix: '/inventoryLocations'
});


//call this to get all the inventoryLocation
router.get('/', async ctx => {
    let inventoryLocation = await inventoryLocationApi.getInventoryLocation()
        .catch(error => {
            ctx.throw(400,'error',error);
        });
    ctx.body = inventoryLocation
});

router.put('/', async ctx => {
    let inventoryLocation = ctx.request.body;
    inventoryLocation = await inventoryLocationApi.updateInventoryLocation( inventoryLocation );
    ctx.response.status = 201;
    ctx.body = inventoryLocation;
   });

//call this to add a new inventoryLocation 
router.post('/', async ctx => {
    let inventoryLocation = ctx.request.body;
    inventoryLocation = await inventoryLocationApi.addInventoryLocation( inventoryLocation )
    .catch(error => {
        ctx.throw(404,error);
    });
    ctx.response.status = 201;
    ctx.body = inventoryLocation;
});

   //Used to delete a inventoryLocation
router.delete('/:id', async ctx => {
    let inventoryLocationId = ctx.params.id;
    ctx.body = await inventoryLocationApi.deleteInventoryLocation( inventoryLocationId )
        .catch(error => {
            ctx.throw(404,error);
        })
})

module.exports = router;