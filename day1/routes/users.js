const router = require('@koa/router')();

router.prefix('/users');

router.post('/signin', async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = {
    code: 0,
    msg: 'success'
  };
});

router.post('/signup', async (ctx, next) => {
  console.log(ctx.request.body)
  ctx.body = {
    code: 0,
    msg: 'success'
  };
});

module.exports = router