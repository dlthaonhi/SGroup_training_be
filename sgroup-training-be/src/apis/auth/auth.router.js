import express from 'express';
import authController from './auth.controller.js';

const routers = express.Router();

routers.post('/login',authController.login);
routers.post('/register',authController.register);

export default routers;