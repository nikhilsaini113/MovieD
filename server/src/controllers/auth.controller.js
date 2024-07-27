import passport from "passport";
import jsonwebtoken from "jsonwebtoken";

const google=passport.authenticate("google", { scope: ["profile", "email"] });

const googleCallback=passport.authenticate("google", { failureRedirect: process.env.CLIENT_URL, successRedirect: process.env.CLIENT_URL });

const loginSuccess=async (req, res) => {
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
        console.log(JSON.stringify(req.user));
        res.status(401).json({ message: "Not Authorized" });
      }
}

const googleSignout = (req, res) => {req.logout((err) => {
    if (err) {
      console.log(err);
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
};

export default {google,googleCallback,loginSuccess,googleSignout};
