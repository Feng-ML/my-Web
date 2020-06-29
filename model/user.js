const mongoose = require("mongoose")
const Schema = mongoose.Schema



const userSchema = new Schema({

    name:{
        type: String,     //类型
        required: true   //是否必填
    },
    email:{
        type: String,     
        required: true   
    },
    password:{
        type: String,     
        required: true   
    },
    avatar:{
        type: String,
        required: false
    }

})


module.exports = User = mongoose.model('user',userSchema)