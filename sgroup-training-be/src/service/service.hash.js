import crypto from 'crypto';

class HashService {
    // async hash (salt, password){
    //     console.log("hashPassword",String(password)+String(salt) );
    //     return String(password)+String(salt);
    // }
    async generateSalt() {
        return crypto.randomBytes(16).toString('hex');
    }

    async hashPassword(salt, password) {
        if (!salt || !password) {
            throw new TypeError('Salt and password must be provided');
        }
        return crypto.createHmac('sha256', salt).update(password).digest('hex');
    }
}

export default new HashService();