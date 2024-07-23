import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";
import session from "express-session";
import passport from "passport";
import { Strategy as OAuth2Strategy } from "passport-google-oauth2";
import userModel from "./src/models/user.model.js";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
const app = express();

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true,
  }
));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

app.use(
  session({
    secret: "googlelogin",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({ email: profile.emails[0].value });

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
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173",
    failureRedirect: "http://localhost:5173",
  })
);
app.get("/login/sucess", async (req, res) => {
  if (req.user && req.isAuthenticated()) {
    const token = jsonwebtoken.sign({ data: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    req.user.token = token;
    res.status(200).json({ message: "User Login", user: req.user });
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out", error: err });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error destroying session", error: err });
      }
      res.clearCookie('connect.sid'); // clear the session cookie
      return res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

const server = http.createServer(app);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected");
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
