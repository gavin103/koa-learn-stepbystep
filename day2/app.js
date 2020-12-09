const Koa = require('koa');
const app = new Koa();
const users = require('./routes/users')
const pages = require('./routes/pages')
app
  .use(require('koa-bodyparser')())
  .use(require('koa-static')(__dirname + '/public'))
  .use(require('koa-views')(__dirname + '/views', { extension: 'ejs' }))

app.use(users.routes()).use(users.allowedMethods());
app.use(pages.routes()).use(pages.allowedMethods());

app.listen(3000)