const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body="首页"
});

router.get('/api/list', (ctx, next) => {
  ctx.body={
    code:0,
    data:ctx.query, //get请求的参数可以在ctx.query拿到
    msg:"success"
  }
});

router.get('/api/item/:id', async (ctx, next) => {
  const {id} = ctx.params //动态路由的参数可以在ctx.params拿到
  ctx.body=`这是第${id}项`
});

router.post('/api/add',async (ctx, next) => {
  //经过bodyParser处理后ctx.request.body可以拿到请求参数
  ctx.body = {
    code:0,
    data: ctx.request.body,
    msg:"success"
  }
})

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000)