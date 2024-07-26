import mongoose from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
    authType: {
      type: String,
      required: true,
      enum: ["google", "local"],
      default: "local",
    },
    avatar: { type: String},
  },
  modelOptions
);

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};
UserSchema.methods.stAvatar = function (link) {
  this.avatar = link;
};
UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.password === hash;
};

const userModel = mongoose.model("User", UserSchema);
export default userModel;
