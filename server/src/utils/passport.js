import session from "express-session";
import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-google-oauth2";
import userModel from "../models/user.model.js";
import crypto from "crypto";
import MongoStore from "connect-mongo";

const passportUtil = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      name: "mycookie",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: true,
        //httpOnly: true,
        sameSite: "none",
        domain: "filmfolioapi.onrender.com",
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        ttl: 30 * 24 * 60 * 60, // 14 days
        autoRemove: "native", // Default
      }),
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new OAuth2Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v1/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findOne({
            email: profile.emails[0].value,
          });

          if (!user) {
            user = new userModel({
              displayName: profile.displayName,
              email: profile.emails[0].value,
              authType: "google",
              password: "googlelogin",
              salt: crypto.randomBytes(16).toString("hex"),
            });

            await user.save();
          }

          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default passportUtil;
