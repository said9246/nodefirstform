const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://Said:Said123@project1.8tk2tfy.mongodb.net/Khan")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('signup',logInSchema)

module.exports=LogInCollection