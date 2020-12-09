const router = require('@koa/router')();
const User = require('../model/Users');

router.prefix('/users');

router.post('/signup', async(ctx, next) => {
    const { email, password } = ctx.request.body
    const user = await User.findOne({ email })
    if (user) {
        ctx.fail('邮箱已占用', -1)
    } else {
        const newUser = new User({ email, password })
        const res = await newUser.save()
        if (res) {
            ctx.body = {
                code: 0,
                msg: 'success',
                data: {
                    email,
                    password
                }
            }
        } else {
            ctx.body = {
                code: 99,
                msg: 'fail',
            }
        }
    }
});

router.post('/signin', async(ctx, next) => {
    const { email, password } = ctx.request.body
    const user = await User.findOne({ email, password })
    if (user) {
        ctx.body = {
            code: 0,
            msg: 'success',
        }
    } else {
        ctx.body = {
            code: 99,
            msg: 'fail',
        }
    }
});

router.post('/chgpw', async ctx => {
    const { email, password, newPassword } = ctx.request.body
    const user = await User.findOne({ email, password }) // 数据库中已有
    if (user) {
        const updateRes = await User.update({ email, password }, {
            email,
            password: newPassword
        });
        if (updateRes.nModified) {
            ctx.body = {
                code: 0,
                msg: 'success',
            }
        } else {
            ctx.body = {
                code: 99,
                msg: 'fail',
            }
        }
    } else {
        ctx.body = {
            code: 99,
            msg: 'fail',
        }
    }
})

module.exports = router