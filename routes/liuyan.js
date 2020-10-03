const express = require("express");
const router = express.Router();
const Liuyan = require('../model/liuyan')



// 提交留言
router.post('/', (req, res) => {

    // console.log(req.body)
    
    const newLiuyan = new Liuyan({
        name: req.body.name,
        type: req.body.type,
        textarea: req.body.textarea,
        currentdate: req.body.currentdate
    })
    newLiuyan.save()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json(err)
        })

    // console.log(newLiuyan)
       
})

// 获取留言
router.get('/', (req,res) =>{
    // console.log(req.body)
    Liuyan.find({})
        .then( data => {
            // console.log(data)
            return res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})






module.exports = router;