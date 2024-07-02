import usersModel from '../../models/users.model.js';
import verifyService from '../../service/service.authentication.js'
import HashService from '../../service/service.hash.js';

class authService {

    constructor() {
        this.usersModel =new usersModel();
    }

    async login (username, password) {
        try {
            const user = await this.usersModel.getUserByUsername(username);
            if (!user) {
                throw new Error ('Username: NOT FOUND'); 
            }
            const enterPassword = HashService.hash(user.salt, password);
            if (user.PASSWORD != enterPassword) {
                throw new Error ('Password: WRONG'); 
            }
            const token = await verifyService.login(user);
            return token;
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
