const Koa = require('koa');
const Router = require('@koa/router');
const views = require('koa-views');
const serve = require('koa-static')
const app = new Koa();
const router = new Router();

app.use(serve(__dirname + '/public'));

const render = views(
  __dirname+ '/views', 
  { extension: 'ejs' }
);
app.use(render)

router.get('/', async (ctx, next) => {
  await ctx.render('index',{
    title: '这是首页',
    jsPath:'/js/index.js',
    cssPath:'/css/index.css'
  })
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000,()=>console.log("Service start at:",3000));