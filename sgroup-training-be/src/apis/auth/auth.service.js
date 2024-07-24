import usersModel from '../../models/users.model.js';
import verifyService from '../../service/service.authentication.js'
import HashService from '../../service/service.hash.js';
import ForgotPassword from '../../service/service.forgotpass.js';
import mailService from '../../service/service.mail.js';
import usersService from '../users/user.service.js';

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
            const enterPassword = await HashService.hashPassword(user.salt, password);
            // console.log(enterPassword);
            if (user.PASSWORD != enterPassword) {
                throw new Error ('Password: WRONG'); 
            }
            const token = await verifyService.login(user);
            return token;
        } catch(error){
            throw error;
        }
    }

    async register (user) {
        try {
            const salt = await HashService.generateSalt();
            const password = await HashService.hashPassword(salt, user.password);
            user.salt = salt; user.PASSWORD = password; 
            await usersService.createUser(user);
        } catch (error) {
            throw error;
        }
    }

    async forgotPassword (email) {
        try {
            const user = await this.usersModel.getUserByEmail(email);
            if (!user) {
                throw new Error ('Email: NOT FOUND'); 
            }
            console.log(user);
            const token = await ForgotPassword.generateToken();
            user.tokenReset = token;
            user.passwordResetExpiration = new Date(Date.now() + 10 * 60 * 1000);
            console.log("The token will expired at:", user.passwordResetExpiration);
            await this.usersModel.updateUser(user.ID, user);
            await mailService.sendEmail(email, "Reset", token);
        } catch (error) {
            throw error;
        }
    }

    async resetPassword ({ email, tokenReset, newPassword }) {
        try {
            const passwordResetExpiration = new Date(Date.now());
            const user = await this.usersModel.getUserResetPassword({email, tokenReset, passwordResetExpiration});
            if (!user) {
                throw new Error ('Invalid token or token has expired')
            }
            console.log("User before changing password:", user);
            const salt = await HashService.generateSalt();
            const password = await HashService.hashPassword(salt, newPassword);
            user.salt = salt; user.PASSWORD = password; 
            user.tokenReset = null; user.passwordResetExpiration = null; user.passwordLastResetDate = new Date(Date.now());
            console.log("New hashed password:", password, user.PASSWORD);
            await this.usersModel.updateUser(user.ID, user);
        } catch (error) {
            throw error;
        }
    }
}

export default new authService();
