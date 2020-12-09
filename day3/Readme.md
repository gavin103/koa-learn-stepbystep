# 第三天任务：打通前后端

## 引入bcrypt对密码进行加密

Node原生的crypto类可以用于加密，不过我们可以引入封装好的bcrypt方法。

> https://www.npmjs.com/package/bcrypt

可以用hash方法计算出加密后的密码
```js
bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
    // Store hash in your password DB.
});
```

可以用compare方法对比输入的密码和存储的密码是否匹配
```js
async function checkUser(username, password) {
    //... fetch user from a db etc.
    const match = await bcrypt.compare(password, user.passwordHash);
    if(match) {
        //login
    }
    //...
}
```

## 引入gravatar获取用户头像

Gravatar是全球认可的头像服务
网址为
https://cn.gravatar.com/
或
https://secure.gravatar.com/

我们可以在此网站注册并上传头像。

官方提供了名为gravatar的npm包，供我们获取头像链接。
如果没有上传头像，则返回默认图片。

```js
const url = gravatar.url('emerleite@gmail.com', {s: '200', r: 'pg', d: '404'});
```

## 任务

1. 使用bcrypt对password字段进行加密

2. 添加avatar字段，取值为通过gravatar获取的头像链接

3. 完成接口，完成前后端调试，实现注册和登陆以及修改密码的功能