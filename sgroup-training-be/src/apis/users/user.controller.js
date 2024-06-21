import UserService from './user.service.js';

class UserController {
    // getAllUsers = async(req,res,next) => {
    //     // return res.send("hello");
    //     try {
    //         const users = UserService.getUsers();
    //         return res.status(200).json(users);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
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

    // getUserById = async(req,res,next) => {
    //     try {
    //         const user = await UserService.getById(req.params.id);
    //         if(user)
    //             res.status(200).json(user);
    //         else
    //             res.status(404).json({message: 'User: NOT FOUND'});
    
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    async createUser (req, res) {
        try {
            // const users = await UserService.getUsers();
            return res.status(200).json({
                success: true,
                message: 'Create successfully',
                // data: users
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            });
        }
    }

    updateUser = async (req, res, next) => {
        let user = await UserService.getById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User: NOT FOUND' });
        }

        user = {
            ...user,
            fullname: req.body.fullname,
            gender: req.body.gender,
            age: req.body.age,
            password: req.body.password
        };

        try {
            await UserService.update(req.params.id, user);
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            });
        }

        return res.status(204).json();
    }

    removeUser = async (req, res, next) => {
        const user = await UserService.getById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'User: NOT FOUND' });
        }

        try {
            await UserService.removeById(req.params.id);
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            });
        }
        return res.status(204).json();
    }

    

}

// export default UserController = new UserController();
export default new UserController();