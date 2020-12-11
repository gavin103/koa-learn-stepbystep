const router = require('@koa/router')();
const User = require('../model/Users');

router.prefix('/users');

router.post('/signup', async (ctx, next) => {
    const { email, password, avatar } = ctx.request.body
    const user = await User.findOne({ email })
    if (user) {
        ctx.fail('邮箱已占用', -1)
    } else {
        const avatar = getAvatar(email)
        const userConf = { avatar, email }
        userConf.password = await encrypt(password)
        const newUser = new User(userConf)
        const res = await newUser.save()
        if (res) {
            ctx.success({ email, avatar })
        } else {
            ctx.fail()
        }
    }
});

router.post('/signin', async (ctx, next) => {
    const { email, password } = ctx.request.body
    const user = await User.findOne({ email })
    if (user) {
        const res = await validate(password, user.password)
        if (res) {
            ctx.success({
                avatar: user.avatar,
                email: user.email
            })
        } else {
            ctx.fail('密码错误')
        }
    } else {
        ctx.fail('该邮箱未注册使用')
    }
});

router.post('/chgpw', async ctx => {
    const { email, password, newPassword } = ctx.request.body
    const user = await User.findOne({ email }) // 数据库中已有
    if (user) {
        const res = await validate(password, user.password)
        if (res) {
            const updateRes = await User.update(
                { email },
                {
                    avatar: getAvatar(email),
                    password: await encrypt(newPassword)
                }
            );
            if (updateRes.nModified) {
                const updatedUser = await User.findOne({ email })
                ctx.success({
                    avatar: updatedUser.avatar,
                    email: updatedUser.email
                })
            } else {
                ctx.fail('更新失败')
            }
        } else {
            ctx.fail('密码错误')
        }
    } else {
        ctx.fail('该邮箱未注册使用')
    }
})

module.exports = router