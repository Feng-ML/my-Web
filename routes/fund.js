const express = require("express");
const app = express();
const router = express.Router();
const Fund = require('../model/fund')



// 提交资金信息
router.post('/', (req, res) => {

    // console.log(req.body)
    
    const newFund = new Fund({
        date: req.body.date,
        type: req.body.type,
        details: req.body.details,
        income: req.body.income,
        spending: req.body.spending,
        balance: req.body.balance,
        person: req.body.person,
    })
    newFund.save()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json(err)
        })

})

// 获取资金信息
router.get('/', (req,res) =>{
    // console.log(req.body)
    Fund.find({})
        .then( data => {
            // console.log(data)
            return res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

//根据id修改数据
router.post('/edit/:id', (req, res) => {
    const fundData = {};
    if(req.body.date){fundData.date = req.body.date}
    if(req.body.type){fundData.type = req.body.type}
    if(req.body.details){fundData.details = req.body.details}
    if(req.body.income){fundData.income = req.body.income}
    if(req.body.spending){fundData.spending = req.body.spending}
    if(req.body.balance){fundData.balance = req.body.balance}
    if(req.body.person){fundData.person = req.body.person}

    //根据id查找并修改
    Fund
        .findOneAndUpdate(
            {_id:req.params.id},
            {$set:fundData},
            {new:true}
        )
        .then(data => {
            // console.log(data)
            return res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

//删除数据
router.delete('/delete/:id', (req,res) =>{
    // console.log(req.body)
    Fund
        .findOneAndRemove({_id:req.params.id})
        .then( data => {
            // console.log(data)
            return res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})



module.exports = router;