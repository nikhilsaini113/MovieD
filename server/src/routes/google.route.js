import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

router.get(
  "/google",
  authController.google
);

router.get(
  "/google/callback",
  authController.googleCallback
);

router.get("/login/success", 
  authController.loginSuccess
);

router.get("/google/signout", 
  authController.googleSignout
);

export default router;
