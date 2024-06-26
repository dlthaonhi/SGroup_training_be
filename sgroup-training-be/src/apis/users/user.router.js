// route.get('/users', function(req,res,next){
//     res.send(users)
// })

// route.get('admin', function(req,res,next){
//     res.send(admin)
// })

import express from 'express';
import usersController from './user.controller.js';
const routers = express.Router();
// route.get('/users', UserController.getUsers);
// route.get('/admin', UserController.admin);
// route.get('/', UserController.getAll);
// route.post('/', UserController.create);
// route.get('/:id', UserController.getById);
// route.put('/:id', UserController.update);
// route.delete('/:id', UserController.delete);

routers
    .get('/', usersController.getUsers)
    .post('/',usersController.createUser)
    .get('/:id', usersController.getUserByID)
    .put('/:id', usersController.updateUser)
    .delete('/:id', usersController.deleteUser);

export default routers;