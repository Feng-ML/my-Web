const express = require("express")
const app = express()
const mongoose = require("mongoose")
const port = process.env.PORT || 5002
const users = require('./routes/users')
const bodyParser = require('body-parser')
const liuyan = require('./routes/liuyan')
const fund = require('./routes/fund')




//body-parser   
app.use(bodyParser.urlencoded({ imit: '50mb',extended: false }))
app.use(bodyParser.json({limit: '50mb'}))
app.use(express.static('public'))


app.get( "/", function( req,res ){
    res.send("hello world")
} )



//路由
app.use('/api/users',users)
app.use('/api/liuyan',liuyan)
app.use('/api/fund',fund)



// 连接数据库
mongoose.connect('mongodb://admin-01:2765522@users-shard-00-00-0tgak.azure.mongodb.net:27017,users-shard-00-01-0tgak.azure.mongodb.net:27017,users-shard-00-02-0tgak.azure.mongodb.net:27017/test?ssl=true&replicaSet=users-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false }
)
    .then(()=>{
        console.log("数据库连接成功")
    })
    .catch((err)=>{
        console.log("连接失败")
        console.log(err)
    })



    
console.log(port)
app.listen(port);