import connection from "../database/database.connection.js";

class UserModel {
    async getAllUsers () {
        try {
            const connection1 = await connection.getConnection();
            const [rows, fields] = await connection1.query('SELECT * FROM USERS');
            connection1.release();
            return rows; 
        } catch (error) {
            throw error;
        }
    }

    async createUser(user) {
        try {
            const connection1 = await pool.getConnection();
            const insertQuery = `
            INSERT INTO users (name, username, age, password, gender, email)
            VALUES (?, ?, ?, ?, ?, ?)
            `;

            const { name, username, age, password, gender, email } = user; 
            const values = [name, username, age, password, gender, email];
            await connection.query(query, values);
            connection1.release();
            return { success: true, message: 'User created successfully' };
        } catch (error) {
            throw error
        }
        
            

    }
}

export default UserModel;