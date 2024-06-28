import authService from './auth.service.js';

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
            return res.status(200).json({
                success: true,
                data: userLogin,
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

}

export default new authController();