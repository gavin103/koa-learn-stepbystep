const router = require('@koa/router')();

router.get('/', async (ctx, next) => {
  ctx.body = "Welcome~"
});

router.get('/login', async (ctx, next) => {
  await ctx.render('login', { title: '登录中心' })
});
router.get('/register', async (ctx, next) => {
  await ctx.render('register', { title: '注册中心' })
});


module.exports = router