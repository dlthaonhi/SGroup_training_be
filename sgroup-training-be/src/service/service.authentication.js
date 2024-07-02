import jwt from 'jsonwebtoken';
import 'dotenv/config';

class verifyService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET;
    }
    
    async login(user) {
        // console.log("user", user);
        return jwt.sign({ id: user.ID}, this.JWT_SECRET , { expiresIn: '1h',algorithm: 'HS256' })
    }
    //jwt.sign(payload, secretOrPrivateKey, [options, callback])
    async verify(token) {
        return jwt.verify(token, this.JWT_SECRET);
    }
}

export default new verifyService();