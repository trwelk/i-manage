const customerApi = require('../api/Customer.api.js');
const Router = require('@koa/router');
const router = new Router({
  prefix: '/customer'
});
//call this to add a new customer 
router.post('/', async ctx => {
  let customer = ctx.request.body;
  customer = await customerApi.addCustomer( customer )
  .catch(error => {
      ctx.throw(404,error);
  });
  ctx.response.status = 201;
  ctx.body = customer;
});
module.exports = router;