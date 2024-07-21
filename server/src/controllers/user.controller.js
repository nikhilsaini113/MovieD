import userModel from "../models/user.model.js";
import responseHandler from "../handlers/response.handler.js";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";

const signup = async (req, res) => {
  try {
    const { email, displayName, password } = req.body;
    const checkUserExists = await userModel.findOne({ email });
    if (checkUserExists) {
      return responseHandler.badRequest(res, "User already exists");
    }
    const user = new userModel();
    user.displayName = displayName;
    user.email = email;
    user.authType = "local";
    user.avatar = "null";
    user.setPassword(password);
    await user.save();
    const token = jsonwebtoken.sign({ data: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    return responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel
      .findOne({ email })
      .select("email password  salt id displayName");
    if (!user) {
      return responseHandler.badRequest(res, "User not found");
    }
    if (!user.validPassword(password)) {
      return responseHandler.badRequest(res, "Invalid credentials");
    }
    const token = jsonwebtoken.sign({ data: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    user.password = undefined;
    user.salt = undefined;

    return responseHandler.ok(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    return responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await userModel
      .findById(req.user.id)
      .select("password salt id");
    if (!user) {
      return responseHandler.unauthorize(res);
    }
    if (!user.validPassword(password)) {
      return responseHandler.badRequest(res, "Wrong password");
    }
  }
  catch(error) {
    return responseHandler.error(res);
  }
}
;
const forgotPassword= async (req,res)=>{
    try{
        const {email}=req.body;
        const user=await userModel.findOne({email}).select("password salt id");
        if (!user){
            return responseHandler.badRequest(res,"Email not registered.");
        }
        const token = jsonwebtoken.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "30m"});
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_ADDRESS,
              pass: process.env.EMAIL_PASSWORD
            }
          });
          
          var mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Reset Password Link',
            text: `To reset Password, click here: ${process.env.CLIENT_URL}/reset-password/${user.id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                return responseHandler.error(res);
            } else {
              return responseHandler.ok(res,{Status: "Email sent suscessfully"});
            }
        });
        return responseHandler.ok(res,{Status: "Email sent suscessfully"});
    }
    catch(error){
        console.log(error);
        return responseHandler.error(res);
    }
}

const resetPassword= async (req,res)=>{
    try{
        const {id,token}=req.params;
        const {password}=req.body;
        const verifyToken=jsonwebtoken.verify(token,process.env.JWT_SECRET);
        if (!verifyToken){
            return responseHandler.badRequest(res,"Invalid token");
        }
        const user=await userModel.findById(id).select("password salt id");
        if (!user){
            return responseHandler.badRequest(res,"User not found");
        }
        user.setPassword(password);
        await user.save();
        return responseHandler.ok(res,{Status:"Success"});
    }
    catch{
        return responseHandler.error(res);
    }
}

const getInfo= async (req,res)=>{
    try{
        const user=await userModel.findById(req.user.id);
        if (!user){
            return responseHandler.notfound(res);
        }
        return responseHandler.ok(res,user);
    user.setPassword(newPassword);
    await user.save();
    return responseHandler.ok(res, {});
  } catch {
    return responseHandler.error(res);
  }
};

const setAvatar = async (req, res) => {
  try {
    const { link } = req.body;
    const user = await userModel
      .findById(req.user.id)
      .select("password salt id");
    if (!user) {
      return responseHandler.unauthorize(res);
    }
    user.stAvatar(link);
    await user.save();
    return responseHandler.ok(res, {});
  } catch {
    return responseHandler.error(res);
  }
};

const getAvatar = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return responseHandler.notfound(res);
    }
    return responseHandler.ok(res, user);
  } catch {
    return responseHandler.error(res);
  }
};

export default {signup,signin,updatePassword,forgotPassword,resetPassword,getInfo,setAvatar,getAvatar};
