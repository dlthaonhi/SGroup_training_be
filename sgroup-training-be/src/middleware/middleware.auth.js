import verifyService from '../service/service.authentication.js'

class MiddlewareVerify {
    async checkAuth(req, res, next) {
        try {
            let token = req.headers.authorization;
            // console.log(token)
            token = token.split(" ")[1];
            if (!token) {
                throw new Error({
                    success: false,
                    message: "Token is required"
                });
            }
        
            // console.log("data",verifyService.verify(token));
            req.user = await verifyService.verify(token);
            // console.log("data: req.user", req.user);
            req.userId = req.user.id;
            next();
        } catch (error) {
            console.log("ssss")
            return res.status(401).json({
                success: false,
                message: "Token is required"
            });
        }
    }
}

export default new MiddlewareVerify();