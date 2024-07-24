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
            INSERT INTO users (name, email, PASSWORD, gender, age, salt)
            VALUES (?, ?, ?, ?, ?,?)
            `;
            console.log("vao day" , user);
            const { name, email, password, gender, age, salt} = user; 
            const values = [user.name, user.email, user.PASSWORD, user.gender, user.age, user.salt];
            await connection.query(insertQuery, values);
            // console.log("user", user);
            connection.release();
            return { 
                success: true, 
                message: 'User created successfully', 
                data: user 
            };
        } catch (error) {
            throw error
        }    

    }

    async getUserByID(userId){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE ID = ?`; 
            const value = [userId];
            const [rows,fields] = await connection.query(query, value);
            // console.log(`rows: ${rows}`);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async getUserByUsername(username){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE name = ?`; 
            const value = [username];
            const [rows,fields] = await connection.query(query, value);
            // console.log(`rows: ${rows}`);
            connection.release();
            return rows[0];
        } catch(error){
            throw error;
        }
    }

    async getUserByEmail(email){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE email = ?`; 
            const value = [email];
            const [rows,fields] = await connection.query(query, value);
            // console.log(`rows: ${rows}`);
            connection.release();
            return rows[0];
        } catch(error){
            throw error;
        }
    }

    async getUserResetPassword ({ email, tokenReset, passwordResetExpiration }) {
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE email = ? AND tokenReset = ? AND passwordResetExpiration >= ? `; 
            const value = [email, tokenReset, passwordResetExpiration];
            const [rows,fields] = await connection.query(query, value);
            // console.log(`rows: ${rows}`);
            connection.release();
            return rows[0];
        } catch(error){
            throw error;
        }
    }


    async updateUser(userId, user){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET name = ?, email = ?, PASSWORD = ?, gender = ?, age = ?, tokenReset = ?, passwordResetExpiration = ?, passwordLastResetDate = ? WHERE ID = ?`; 
            const {name, email, password, gender, age, tokenReset, passwordResetExpiration, passwordLastResetDate} = user;
            const value = [name, email, password, gender, age, tokenReset,passwordResetExpiration, passwordLastResetDate, userId];
            console.log("Updated:", user);
            await connection.query(query, value);
            return { success: true, message: 'User created successfully' };
        } catch(error){
            throw error;
        }
    }

    async deleteUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM users WHERE id = ?`; 
            const value = [userId];
            await connection.query(query, value);
            return { success: true, message: 'User created successfully' };
        }catch(error){
            throw error;
        }
    }
}

export default usersModel;

