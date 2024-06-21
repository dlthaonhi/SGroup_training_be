// route.get('/users', function(req,res,next){
//     res.send(users)
// })

// route.get('admin', function(req,res,next){
//     res.send(admin)
// })

import express from 'express';
import UserController from './user.controller.js';
const routers = express.Router();
// route.get('/users', UserController.getUsers);
// route.get('/admin', UserController.admin);
// route.get('/', UserController.getAll);
// route.post('/', UserController.create);
// route.get('/:id', UserController.getById);
// route.put('/:id', UserController.update);
// route.delete('/:id', UserController.delete);

routers
    .get('/', UserController.getUsers)
    // .get('/:id', UserController.getUserById)
    .post('/',UserController.createUser)
    // .put('/:id', UserController.updateUser)
    // .delete('/:id');

export default routers;