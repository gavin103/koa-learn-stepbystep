# 第一天任务：基本框架搭建

## 1.引入Koa：Hello World

> 以下内容部分摘自 https://www.koajs.com.cn/

### 1.1

Koa 应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。

Koa中间件使用异步函数，避免了繁琐的回调嵌套。

```
npm install koa
```

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

在命令行，使用node运行app;

```
node app.js
```

由于commonjs导出的值会复制一份，require引入的是复制之后的值（引用类型只复制引用），所以在app运行起来之后，再修改的代码是无法实时生效的，这样给开发带来了诸多不便。

为了解决这一问题，我们引入nodemon。使用nodemon运行app，即```nodemon app.js```，在代码修改之后，app会立刻重启。我们也可以将```nodemon app.js```命令写入package.json的script中。

```
npm install -g nodemon //和node一样，全局安装
```

### 1.2    

app.use中传入的是函数我们可以理解为应用级中间件，每一次请求的请求数据都需要经过所有应用级中间件的顺序处理。

值得提到的是中间件函数的第二个参数next，是一个方法。在中间件中执行next方法后，就会**顺序**执行下一个中间件。

直到命中最后的路由，生成响应数据，响应数据又**逆序**的经过所有的中间件中next后面的逻辑进行处理。

这就是Koa中的洋葱模型。

![洋葱](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a650d9208764b2fbb235d4c6c727d6c~tplv-k3u1fbpfcp-watermark.image)

下面代码中的log执行顺序是：1->2->3->4->5

```js
const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
  // console.log(1)
  const start = Date.now();
  await next();
  // console.log(5)
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`); 
});

// logger

app.use(async (ctx, next) => {
  // console.log(2)
  const start = Date.now();
  await next();
  // console.log(4)
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
  // console.log(3)
  ctx.body = 'Hello World';
});

app.listen(3000);

```

### 1.3

Koa实例的其他属性，上下文context具体内容，请查阅Koa中文官网学习。


## 2.引入@koa/router

```
npm install @koa/router
npm install koa-bodyparser
```
> https://github.com/koajs/router/blob/master/API.md

koa-router可以帮助我们简单的定义路由，包括页面路径和数据接口都可以。

get请求的参数可以在上下文的ctx.query中拿到，
动态路由的参数可以在上下文ctx.params中拿到，
post请求的参数，需要使用bodyParser中间件帮我们解析一下，然后在上下文的ctx.request.body上拿到。

```js
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

// 可以在浏览器中输入http://127.0.0.1:3000查看效果
```

router也可以采用use方法引入路由级中间件```router.use([path], middleware) ```


## 3.引入koa-views和ejs

```
npm install koa-views
npm install ejs
```
> https://github.com/queckezz/koa-views#readme
> https://ejs.bootcss.com/

koa-views可以帮助我们解析模板引擎。

给views配置一下路径，和其他参数，生成render方法并将其绑定在app上。就可以在上下文环境上调用render方法渲染模板了。

@koa/router和koa-views结合使用，可以实现后端渲染的页面。
```js
const Koa = require('koa');
const Router = require('@koa/router');
const views = require('koa-views');

const app = new Koa();
const router = new Router();
const render = views(
  __dirname+ '/views', 
  { extension: 'ejs' }
);
app.use(render)
router.get('/', async (ctx, next) => {
  await ctx.render('index',{
    title: '这是首页'
  })
});
router.get('/list', async (ctx, next) => {
  await ctx.render('list',{
    list: [
      '国际新闻',
      '国内新闻',
      '最新疫情'
    ]
  })
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(
  3000,
  ()=>console.log("Service start at:",3000)
);
```

## 4.引入koa-static
```
npm install koa-static
```
> https://www.npmjs.com/package/koa-static

koa-static 解决了后端分发静态资源的问题。

```js
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
```

## 总结

一个后端渲染的MVC架构包含以下三部分：
- Modal: 渲染数据
- View: 模板引擎
- Controller: 路由

在koa这个体系中可以用@koa/router+koa-views简单实现。
而koa-static则赋予koa分发静态文件的功能。

另外介绍一个koa的脚手架：koa-generator
以上的内容在脚手架中都有实现

## 任务

1. 使用以上内容搭建一个具有登录页和注册页的服务，要求有渲染页面，也有调用接口（接口返回数据可以暂时设为固定值）；
2. 使用koa-generator创建koa项目，对比两个项目不同；
3. 通过脚手架生成的项目，学习应用级中间件的写法，并将路由中间件进行组件化拆分；
4. 通过脚手架生成的项目和ejs官网，学习模板的模块化开发。
