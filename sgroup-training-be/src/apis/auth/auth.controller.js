import authService from './auth.service.js';

class authController {

    async login(req, res) {
        try {
            const userLogin = req.body;
            const username = userLogin.name;
            const password = userLogin.password;
            console.log("username:", username);
            const user = await authService.login(username, password);
            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
        
    }
    
    // async getUserByID(req, res, next){
    //     try{
    //         const userId = req.params.id;
    //         const user = await usersService.getUserByID(userId);
    //         console.log(`user: ${user}`)
    //         return res.status(200).json({
    //             success: true,
    //             data: user
    //         });
    //     }catch(error){
    //         return res.status(500).json({
    //             success: false,
    //             message: "Internal Server Error"
    //         });
    //     }
    // }
}

export default new authController();