const mongoose=require("mongoose");
const recipientSchema=require("./recipient.js")
const {Schema}=mongoose;
const SurveySchema=new Schema({
    title:String,
    body:String,
    subject:String,
    recipients:[recipientSchema],
    yes:{type:Number,default:0},
    no:{type:Number,default:0},
    _user:{type:Schema.Types.ObjectId,ref:"User"},
    dateSent:Date,
    lastDate:Date
});
mongoose.model('surveys',SurveySchema)