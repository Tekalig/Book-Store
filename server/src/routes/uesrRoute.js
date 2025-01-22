const express = require('express');
const userController = require('../controllers/userController');

const userRoute = express.Router();

userRoute.post('/register', userController.register);

userRoute.post('/login', userController.login);

userRoute.post('/logout', userController.logout);

userRoute.get('/verify', userController.verify);

userRoute.get('/profile', userController.profile);

userRoute.post('/verify/2fa', userController.verify2fa);

userRoute.post('/verify/account/{token}', userController.verifyAccount);

userRoute.post("/sendme-verification-email", userController.sendMeVerificationEmail);

userRoute.post('/change-password', userController.changePassword);

userRoute.post('/forgot-password', userController.forgotPassword);

userRoute.post('/reset-password/{token}', userController.resetPassword);

userRoute.post('/toggle/2fa', userController.toggle2fa);

