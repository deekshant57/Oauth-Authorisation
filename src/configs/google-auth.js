const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { v4: uuidv4 } = require("uuid");

const User = require("../models/user.model");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile.emails[0].value);

      let user = await User.findOne({ email: profile?._json?.email })
        .lean()
        .exec();

      console.log(user);

      if (!user) {
        user = await User.create({
          email: profile._json.email,
          password: uuidv4(),
          role: ["customer"],
        });
      }

      console.log(accessToken, refreshToken, profile);
      return cb(null, user);
    }
  )
);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:4000/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       //     return cb(err, user);
//       //   });
//       console.log(accessToken, refreshToken, profile);
//       return cb(err, user);
//     }
//   )
// );

module.exports = passport;
