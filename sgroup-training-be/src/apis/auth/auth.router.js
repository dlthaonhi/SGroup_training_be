import express from 'express';
import authController from './auth.controller.js';

const routers = express.Router();

routers.post('/login',authController.login);
routers.post('/register',authController.register);
routers.post('/forgot-password',authController.forgotPassword);
routers.post('/reset-password',authController.resetPassword);


export default routers;