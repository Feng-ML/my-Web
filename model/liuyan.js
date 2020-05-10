const mongoose = require("mongoose")
const Schema = mongoose.Schema



const liuyanSchema = new Schema({

    // 作者
    name:{
        type: String,     //类型
        required: true   //是否必填
    },
    // 内容分类
    type:{
        type: String,     
        required: true   
    },
    // 填写内容
    textarea:{
        type: String,     
        required: true   
    },
    //提交时间
    currentdate:{
        type: String,     
        required: true   
    }

})


module.exports = Liuyan = mongoose.model('liuyan',liuyanSchema)