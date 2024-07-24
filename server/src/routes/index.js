import express from "express";
import userRoute from "./user.route.js";
import mediaRoute from "./media.route.js";
import personRoute from "./person.route.js";
import reviewRoute from "./review.route.js";
import googleRoute from "./google.route.js";
const router = express.Router();
router.use("/user", userRoute);
router.use("/google", googleRoute);
router.use("/:mediaType", mediaRoute);
router.use("/person", personRoute);
router.use("/reviews", reviewRoute);

export default router;
