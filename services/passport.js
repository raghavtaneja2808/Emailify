const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("../config/keys.js");

passport.serializeUser((user, done) => {
    console.log("Serializing User: ", user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("Deserializing User", id);
   try{ const user=await User.findById(id);
    done(null, user);  // ✅ No need to fetch from DB as data is stored in session
   }
   catch(error){
    done(error)
   }
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: keys.callbackURL || '/auth/google/callback',
    scope: ['profile', 'email']  // ✅ Ensures email & photo are included
}, async (accessToken, refreshToken, profile, done) => {
    console.log("Google Profile Data:", profile);
    let existingUser = await User.findOne({ googleID: profile.id });
    // ✅ Pass the required data to `done()` directly

    if (!existingUser) {
       existingUser= await new User({ googleID: profile.id,name:profile.displayName,email:profile._json?.email,photo:profile._json?.picture }).save();  // Only store googleID in DB
    }

    done(null, existingUser);
}));
