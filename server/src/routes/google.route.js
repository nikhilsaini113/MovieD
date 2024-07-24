import express from "express";
import axios from "axios";
import passport from "passport";
import jsonwebtoken from "jsonwebtoken";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.CLIENT_URL,
  })
);

router.get("/login/sucess", async (req, res) => {
  if (req.user && req.isAuthenticated()) {
    const token = jsonwebtoken.sign(
      { data: req.user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    req.user.token = token;
    res.status(200).json({ message: "User Login", user: req.user });
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out", error: err });
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

export default router;
