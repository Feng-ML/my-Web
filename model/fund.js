const mongoose = require("mongoose")
const Schema = mongoose.Schema



const fundSchema = new Schema({

    // 时间
    date:{
        type: String,     //类型
        required: true   //是否必填
    },
    // 收支类型
    type:{
        type: String,     
        required: true   
    },
    // 详情
    details:{
        type: String,     
        required: true   
    },
    //收入
    income:{
        type: Number,     
        required: true   
    },
    // 支出
    spending:{
        type: Number,     
        required: true   
    },
    // 余额
    balance:{
        type: Number 
    },
    // 操作人员
    person:{
        type: String,     
        required: true   
    }

})


module.exports = Fund = mongoose.model('fund',fundSchema)