const express = require("express");
const {
  register,
  login,
  logout,
  verify,
  profile,
  verify2fa,
  verifyAccount,
  sendMeVerificationEmail,
  changePassword,
  forgotPassword,
  resetPassword,
  toggle2fa,
} = require("../controllers/userController");

const userRoute = express.Router();

userRoute.post("/register", register);

userRoute.post("/login", login);

userRoute.post("/logout", logout);

userRoute.get("/verify", verify);

userRoute.get("/profile", profile);

userRoute.post("/verify/2fa", verify2fa);

userRoute.post("/verify/account/{token}", verifyAccount);

userRoute.post("/sendme-verification-email", sendMeVerificationEmail);

userRoute.post("/change-password", changePassword);

userRoute.post("/forgot-password", forgotPassword);

userRoute.post("/reset-password/{token}", resetPassword);

userRoute.post("/toggle/2fa", toggle2fa);
