import express from 'express';
import authController from './auth.controller.js';

const routers = express.Router();

routers
    // .get('/', usersController.getUsers)
    // .post('/',usersController.createUser)
    // .get('/:id', usersController.getUserByID)
    // .put('/:id', usersController.updateUser)
    // .delete('/:id', usersController.deleteUser);
    .post('/',authController.login);

export default routers;