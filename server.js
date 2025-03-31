const express = require('express');
const keys=require('./config/keys.js');
const app = express();
const cookieSession=require('cookie-session');
const mongoose=require("mongoose");
const passport = require('passport');
require("./models/user.js");
require("./models/surveys.js");
require("./services/passport.js");
const cors=require("cors");

app.use(express.json());  // ✅ Parses incoming JSON data
app.use(express.urlencoded({ extended: true }));  // ✅ Handles URL-encoded data (e.g., form submissions)
app.use(cors({
    origin: "http://localhost:3000", // ✅ Set to your frontend URL
    credentials: true // ✅ Allows cookies & session data to be sent
}));app.use(express.json());
app.use(cookieSession({
    maxAge:30*24*60*60*1000,
    keys:[keys.cookieKey],

}));
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(keys.SGK)
// const msg = {
//   to: 'meesha140203@gmail.com', // Change to your recipient
//   from: 'primoel968@proton.me', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
app.use(passport.initialize());
app.use(passport.session());
require('./config/authRoutes.js')(app);
require("./routes/stripeRoute.js")(app);
mongoose.connect(keys.mongoURI).then(()=>console.log("connected"));
const PORT=process.env.PORT||5000
app.listen(PORT,'0.0.0.0',() => {
    console.log('Website running at http://localhost:5000');
});
