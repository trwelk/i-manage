const cotactUsApi = require('../api/ContactUs.api.js');
const Router = require('@koa/router');

const router = new Router({
  prefix: '/contact'
});

router.post('/', async ctx => {
  let cotact = ctx.request.body;
  cotact = await cotactUsApi.addContactUs( cotact )
  .catch(error => {
      ctx.throw(404,error);
  });
  ctx.response.status = 201;
  ctx.body = cotact;
});

module.exports = router;