const express = require("express");
const app = express();
const router = express.Router();
const User = require('../model/user')




//注册
router.get('/', (req, res) => {
    res.send('这是注册页面！')
})
    .post('/register', (req, res) => {
    console.log(req.body)

    User.findOne({email: req.body.email})
        .then( user => {

            if( user ){
                // console.log('该邮箱已被注册')
                return res.status(400).json('该邮箱已被注册')
            }else{
                // console.log('该邮箱可以使用')
                const newUser = new User({
                    email: req.body.email,
                    name: req.body.username,
                    password: req.body.pass,
                    avatar: ''
                })
                

                //保存用户数据
                newUser.save()
                    .then(user => {
                        res.json(user)
                    })
                    .catch(err => {
                        res.json(err)
                    })
            }
        })
})



// 登录
router.post('/login', (req, res) => {


    User.findOne({email: req.body.email})
        .then( user => {
            // console.log(req.body)
            if( user ){

                if( req.body.pass == user.password ){
                    console.log('登录成功')
                    return res.json(user)
                }else{
                    // console.log('密码错误，请重新输入')
                    return res.status(400).json('密码错误，请重新输入！')
                }

            }else{
                // console.log('该邮箱不存在，请重新输入')
                return res.status(400).json('用户不存在！')
            }
        })

})



// 更改头像
router.post('/avatar', (req, res) => {

    // console.log(req.body)

    User.findOneAndUpdate(
            {email: req.body.email},
            {$set:{avatar: req.body.avatar}}
        )
        .then(data => {
            // console.log(data)
            return res.json(data)
        })
        .catch(err => {
            res.json(err)
        })

})


module.exports = router;