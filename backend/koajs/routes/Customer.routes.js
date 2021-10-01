const customerApi = require('../api/Customer.api.js');
const Router = require('@koa/router');
const jsonwebtoken = require('jsonwebtoken');
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
router.post('/login',async ctx => {
  let user = ctx.request.body;
  user = await customerApi.userLogin(user.emailAddress, user.password);
  let token = {}
  if(user.logged){
           token = jsonwebtoken.sign({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            contactNumber: user.contactNumber,
            address: user.address,
            emailAddress: user.emailAddress,
            password: user.password,
          }, "jwtSecret")

          ctx.body = {token:token, auth: true};
          ctx.response.status = 201;
      }
      else{
          ctx.body = {token:null, auth: false};
          ctx.response.status = 201;
      }
 });

module.exports = router;