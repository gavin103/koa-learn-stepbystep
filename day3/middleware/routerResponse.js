function routerResponse(option = {}) {
  return async function (ctx, next) {
    ctx.success = function (data, msg = 'success') {
      ctx.type = option.type || 'json'
      const body = {
        code: option.successCode || 0,
        msg,
      }
      if (data) {
        body.data = data
      }
      ctx.body = body
    }

    ctx.fail = function (msg, code) {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: code || option.failCode || 99,
        msg: msg || option.successMsg || 'fail',
      }
      console.log(ctx.body)
    }

    await next()
  }

}

module.exports = routerResponse
