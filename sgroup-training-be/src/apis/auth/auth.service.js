import usersModel from '../../models/users.model.js';

class authService {

    constructor() {
        this.usersModel =new usersModel();
    }

    async login (username, password) {
        try {
            const user = await this.usersModel.getUserByUsername(username);
            console.log("user:", user);
            if (!user) {

                throw new Error ('Username: NOT FOUND'); 
            }
            if (user.PASSWORD != password) {

                throw new Error ('Password: WRONG'); 
            }
            return user;
        } catch(error){
            throw error;
        }
    }

    // async getUserByUsername (username){
    //     try {
    //         const user = await this.usersModel.getUserByUsername(username);
    //         return user;
    //     }catch(error){
    //         throw error;
    //     }
    // }
}

export default new authService();
