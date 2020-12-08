# 第二天任务：连接数据库

MongoDB 是一个基于分布式文件存储的数据库。它的数据结构和JSON很像，所以我们学起来会更加轻松一些。

## MondoDB概念的学习

MongoDB学习文档：https://www.runoob.com/mongodb/mongodb-tutorial.html

首先我们需要先配置一个MongoDB便于学习。
无论是Windows，OSX还是Linux都可以安装MongoDB。
在上面的学习文档中可以找到方法。

为了方便使用，MongoDB官方在 https://cloud.mongodb.com/ 为用户配置了512M的免费数据库空间，我们可以直接注册使用。

除了使用命令操作数据库，我们还可以用GUI的工具连接数据库，对其中的数据进行增删改查的操作。这里推荐官方的软件Compass，可以在这里下载：https://www.mongodb.com/products/compass

## Mongoose学习

Mongoose是在node.js异步环境下对mongodb进行便捷操作的对象模型工具

Mongoose学习文档：http://www.mongoosejs.net/docs/cnhome.html

我们需要理解几个概念：Connection, Schema, Model

用Mongoose实现数据库的增删改查，尝试使用 find, findOne, update, remove, update, count, limit, skip等方法。

> count方法返回记录条数，limit和skip结合使用可以实现分页查询。

## 任务

1. 在MongoDB中创建一个users库，使用Mongoose连接数据库，

2. 创建一个Schema实例，生成Model对象。要求Schema的数据结构中包含：邮箱名和密码。

3. 封装几个方法，可以实现Collection的增改查方法，另外还要实现分页查询的方法。