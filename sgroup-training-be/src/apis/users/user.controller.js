import usersService from './user.service.js';

class usersController {

    async getUsers(req, res) {
        try {
            const users = await usersService.getUsers();
            return res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            });
        }
        
    }

    async getUserByID(req, res, next){
        try{
            const userId = req.params.id;
            const user = await usersService.getUserByID(userId);
            console.log(`user: ${user}`)
            return res.status(200).json({
                success: true,
                data: user
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    async createUser(req, res, next){
        try{
            const newUser = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                age: req.body.age
            }
            await usersService.createUser(newUser);
            return res.status(200).json({
                success: true,
                message: "Created User"
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    async updateUser(req, res, next){
        try{
            const userId = req.params.id;
            const user = await usersService.getUserByID(userId);
            if (!user) return res.status(500).json({
                success: false,
                message: "User: NOT FOUND!"
            });
            const newInfo = req.body;
            const newUser = {...user, ...newInfo};
            await usersService.updateUser(userId, newUser);
            return res.status(200).json({
                success: true,
                message: "Updated User"
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }

    async deleteUser(req, res, next){
        try{
            const userId = req.params.id;
            await usersService.deleteUser(userId);
            return res.status(200).json({
                success: true,
                message: "Deleted User"
            });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    }


    // async createUser (req, res) {
    //     try {
    //         // const users = await UserService.getUsers();
    //         return res.status(200).json({
    //             success: true,
    //             message: 'Create successfully',
    //             // data: users
    //         });
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({
    //             success: false,
    //             message: "Internal Service Error"
    //         });
    //     }
    // }

    // updateUser = async (req, res, next) => {
    //     let user = await UserService.getById(req.params.id);
    //     if (user == null) {
    //         return res.status(404).json({ message: 'User: NOT FOUND' });
    //     }

    //     user = {
    //         ...user,
    //         fullname: req.body.fullname,
    //         gender: req.body.gender,
    //         age: req.body.age,
    //         password: req.body.password
    //     };

    //     try {
    //         await UserService.update(req.params.id, user);
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({
    //             success: false,
    //             message: "Internal Service Error"
    //         });
    //     }

    //     return res.status(204).json();
    // }

    // removeUser = async (req, res, next) => {
    //     const user = await UserService.getById(req.params.id);
    //     if (user == null) {
    //         return res.status(404).json({ message: 'User: NOT FOUND' });
    //     }

    //     try {
    //         await UserService.removeById(req.params.id);
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({
    //             success: false,
    //             message: "Internal Service Error"
    //         });
    //     }
    //     return res.status(204).json();
    // }

    

}

// export default UserController = new UserController();
export default new usersController();