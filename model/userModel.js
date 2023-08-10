const mongoose =require('mongoose')

const userModel = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    username:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const UserModel = mongoose.model('user',userModel)

module.exports = UserModel