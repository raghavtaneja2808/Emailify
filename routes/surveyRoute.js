const { default: mongoose } = require("mongoose");
const requireCredits = require("../middleware/requireCredits.js");
const requireLogin=require("../middleware/requireLogin.js");
const Survey=mongoose.model("surveys");
const sendgrid=require('../services/mailer.js');
const surveyTemplate = require("../services/emailTemplates/surveyTemplate.js");
module.exports=(app)=>{
    app.post("/api/surveys",requireLogin,requireCredits,(req,res)=>{
        const {title,subject,body,recipients}=req.body;
        const survey=new Survey({
            title,
            subject,
            recipients:recipients.split(",").map(email=>({email:email.trim()})),
            _user:req.user.id,
            dateSent:Date.now()
        })
    const mailer=new sendgrid(survey,surveyTemplate(survey))
    })
}