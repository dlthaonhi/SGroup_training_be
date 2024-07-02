import fs from 'fs';
import usersModel from '../../models/users.model.js';
import HashService from '../../service/service.hash.js';

class usersService {

    constructor() {
        this.usersModel =new usersModel();
    }

    async getUsers() {
        try {
            const users = await this.usersModel.getAllUsers();
            return users;
        } catch (error) {
            throw error;
        }

    }
    async getUserByID (userId){
        try {
            const user = await this.usersModel.getUserByID(userId);
            return user;
        }catch(error){
            throw error;
        }
    }
    
    async createUser(user){
        try {
            console.log("vao user service")
            user.password = await HashService.hash(user.salt, user.password);
            await this.usersModel.createUser(user);
            return true;
        }catch(error){
            throw error;
        }
    }

    async updateUser(userId, user){
        try {
            await this.usersModel.updateUser(userId, user);
            return true;
        }catch(error){
            throw error;
        }
    }

    async deleteUser(userId){
        try {
            await this.usersModel.deleteUser(userId);
            return true;
        }catch(error){
            throw error;
        }
    }
}

export default new usersService();

