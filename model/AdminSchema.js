const mongoose=require('mongoose')


let adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


module.exports=mongoose.model('admin',adminSchema)