const express = require("express");
const app = express();
const router = express.Router();
const Fund = require('../model/fund')



// 添加资金信息
router.post('/', (req, res) => {

    const newFund = new Fund({
        date: req.body.date,
        type: req.body.type,
        details: req.body.details,
        income: req.body.income,
        spending: req.body.spending,
        person: req.body.person,
    })
    
    // 计算余额
    let balance = parseInt(req.body.balance) + parseInt(req.body.income) - parseInt(req.body.spending)

    // 更改资金余额
    Fund
        .findOneAndUpdate(
            {type: '资金余额'},
            {$set:{balance}},
            {new:true}
        )
        .catch(err => {
            res.json(err)
        })

    
    // 保存数据
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

    Fund.find({})
        .then( data => {
            return res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})

//编辑资金信息
router.post('/edit/:id', async (req, res) => {
    const fundData = {};
    if(req.body.date){fundData.date = req.body.date}
    if(req.body.type){fundData.type = req.body.type}
    if(req.body.details){fundData.details = req.body.details}
    if(req.body.income){fundData.income = req.body.income}
    if(req.body.spending){fundData.spending = req.body.spending}
    if(req.body.person){fundData.person = req.body.person}
    
    let diff = 0;
    // 查找旧数据
    await Fund.findOne({_id:req.params.id})
            .then(data => {

                // 计算差值
                diff = parseInt(req.body.income) - parseInt(req.body.spending) - (data.income - data.spending)
                return
            })
            .catch(err => {
                res.json(err)
            })

    // 有差额时更改资金余额
    if(diff !==0 ){
        // 更改资金余额
        Fund
            .findOneAndUpdate(
                {type: '资金余额'},
                {$set:{balance: parseInt(req.body.balance) + diff}},
                {new:true}
            )
            .catch(err => {
                res.json(err)
            })
    }       

    
    // 根据id查找并修改
    Fund.findOneAndUpdate(
            {_id:req.params.id},
            {$set:fundData},
            {new:true}
        )
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            res.json(err)
        })

 
    
})

//删除资金信息
router.post('/delete', async (req,res) =>{

    // 计算差值
    let diff = 0;
    await Fund.findOne({_id:req.body.id})
    .then(data=>{
        diff = data.income - data.spending
    })
    .catch(err => {
        res.json(err)
    })

    // 有差额时更改资金余额
    if(diff !==0 ){
        // 更改资金余额
        Fund
            .findOneAndUpdate(
                {type: '资金余额'},
                {$set:{balance: req.body.balance - diff}},
                {new:true}
            )
            .catch(err => {
                res.json(err)
            })
    } 

    // 移除信息
    Fund
        .findOneAndRemove({_id:req.body.id})
        .then(data => {
            return res.json(data)
        })
        .catch(err => {
            res.json(err)
        })

    

    
})


module.exports = router;