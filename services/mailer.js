const sendgrid=require("@sendgrid/mail");
const keys = require("../config/keys");
sendgrid.setApiKey(keys.SGK)
module.exports=sendgrid