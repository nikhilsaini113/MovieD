import session from "express-session";
import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-google-oauth2";
import userModel from "../models/user.model.js";
import crypto from "crypto";
const passportUtil = (app) => {
  app.use(
    session({
      secret: "googlelogin",
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
      },
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
              avatar: "null",
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
  app.get("/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error logging out", error: err });
      }
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error destroying session", error: err });
        }
        res.clearCookie("connect.sid"); // clear the session cookie
        return res.status(200).json({ message: "Logged out successfully" });
      });
    });
  });
};

export default passportUtil;
