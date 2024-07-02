class HashService {
    async hash (salt, password){
        console.log("hashPassword",String(password)+String(salt) );
        return String(password)+String(salt);
    }
}

export default new HashService();