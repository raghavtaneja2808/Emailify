const mongoose=require("mongoose");
// const Schema=mongoose.Schema;
const {Schema}=mongoose;

const userSchema=new Schema({
    googleID:String,
    name:String,
    email:String,
    photo:String,
    credits:{type:Number,default:0},
})

mongoose.model('users',userSchema)