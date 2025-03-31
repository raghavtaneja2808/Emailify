require('dotenv').config();

module.exports = {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    callbackURL:process.env.CALLBACKURL,
    stripePublishableKey:process.env.SPK,
    stripeSecretKey:process.env.SCK,
    SGK:process.env.SGK,
    CLIENT_URL:"http://localhost:3000"
};

