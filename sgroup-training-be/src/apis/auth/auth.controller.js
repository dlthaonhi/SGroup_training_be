import authService from './auth.service.js';
import usersService from '../users/user.service.js';

class authController {

    async login(req, res) {
        try {
            const userLogin = req.body;
            const username = userLogin.name;
            const password = userLogin.password;
            console.log("username:", username);
            const token = await authService.login(username, password);
            if (!token) 
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            req.user = token;
            
            return res.status(200).json({
                success: true,
                // data: userLogin
                data: token
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
        
    }

    async register (req,res) {
        try {
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                age: req.body.age
            }
            await authService.register(newUser);
            // await usersService.createUser(newUser);
            return res.status(200).json({
                success: true,
                message: "Created User"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async forgotPassword (req, res) {
        try {
            const email = req.body.email;
            await authService.forgotPassword(email);
            return res.status(200).json({
                success: true,
                message: "Send successfully"
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async resetPassword (req, res) {
        try {
            const { email, tokenReset, newPassword } = req.body;
            await authService.resetPassword({ email, tokenReset, newPassword });
            return res.status(200).json({
                success: true,
                message: "Reset password successfully"
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

}

export default new authController();