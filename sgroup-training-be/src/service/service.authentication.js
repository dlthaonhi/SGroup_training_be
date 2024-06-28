import jwt from 'jsonwebtoken';

class verifyService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET;
    }
    
    async login(user) {
        console.log("user", user);
        return jwt.sign({ id: user.ID}, this.JWT_SECRET , { expiresIn: '1h',algorithm: 'RS256' })
    }
    //jwt.sign(payload, secretOrPrivateKey, [options, callback])
}

export default new verifyService();