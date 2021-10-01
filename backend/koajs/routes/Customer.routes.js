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
router.get('/:username', async ctx => {
  const email = ctx.params.username;
  ctx.body = await customerApi.getUser(email);
 });
 router.put('/update', async ctx => {
  let user = ctx.request.body;
  user = await customerApi.updateUser(user);
  ctx.response.status = 201;
  ctx.body = user;
 });

 router.delete('/:id', async ctx => {
  let userid = ctx.params.id
  ctx.body = await customerApi.deleteUser(userid);
})
module.exports = router;