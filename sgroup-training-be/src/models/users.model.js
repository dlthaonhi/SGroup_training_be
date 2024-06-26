import pool from "../database/database.connection.js";

class usersModel {
    async getAllUsers () {
        try {
            const connection = await pool.getConnection();
            const [rows, fields] = await connection.query('SELECT * FROM USERS');
            connection.release();
            return rows; 
        } catch (error) {
            throw error;
        }
    }

    async createUser(user) {
        try {
            const connection = await pool.getConnection();
            const insertQuery = `
            INSERT INTO users (name, email, password, gender, age)
            VALUES (?, ?, ?, ?, ?)
            `;

            const { name, email, password, gender, age} = user; 
            const values = [name, email, password, gender, age];
            await connection.query(insertQuery, values);
            connection.release();
            return { success: true, message: 'User created successfully' };
        } catch (error) {
            throw error
        }    

    }

    async getUserByID(userId){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE UserID = ?`; 
            const value = [userId];
            const [rows,fields] = await connection.query(query, value);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }


    async updateUser(userId, user){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET name = ?, email = ?, password = ?, gender = ?, age = ? WHERE UserID = ?`; 
            const {name, email, password, gender, age} = user;
            const value = [name, email, password, gender, age, userId];
            await connection.query(query, value);
            return { success: true, message: 'User created successfully' };
        } catch(error){
            throw error;
        }
    }

    async deleteUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM users WHERE UserID = ?`; 
            const value = [userId];
            await connection.query(query, value);
            return { success: true, message: 'User created successfully' };
        }catch(error){
            throw error;
        }
    }
}

export default usersModel();

