import fs from 'fs';
import UserModel from '../../models/users.model.js';

class UserService {

    constructor() {
        this.UserModel = new UserModel ();
    }

    async getUsers() {
        try {
            const users = await this.UserModel.getAllUsers();
            return users;
        } catch (error) {
            throw error;
        }

    }
    // async getById(id) {
    //     const connection = await pool.getConnection();
    //     const [rows, fields] = await connection.query('SELECT * FROM USERS WHERE ID = ?', [id]);
    //     connection.release();
    //     return rows[0];
    // }
    // async create(user) {
        
    //         const insertQuery = `
    //         INSERT INTO users (gender, name, username, age, password, email)
    //         VALUES (?, ?, ?, ?, ?, ?)
    //         `;

    //         const { gender, name, username, age, password, email } = user; 
    //         const values = [name, gender, username, age, password, email, salt, forgetPasswordToken];
    //         await connection.query(query, values);
    //         connection.release();
    //         return { success: true, message: 'User created successfully' };

    // }
}

export default new UserService();

