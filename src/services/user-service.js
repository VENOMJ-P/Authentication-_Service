const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const UserRepository = require('../repository/user-repository');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword){
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordMatch = this.checkPassword(plainPassword,user.password)
            if(!passwordMatch){
                console.log("password doesn't match");
                throw {error:'Incorrect password'}
            }
            const newJwt = this.createToken({
                email:user.email, id:user.id
            })
            return newJwt;
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw error;
        }
    }
    async isAuthenticated(token){
        try {
           const response = this.verifyToken(token);
           if(!response) {
            throw {error: 'Invalid token'}
           }
           const user = await this.userRepository.getById(response.id);
           if(!user) {
            throw {error: 'No user with the corresponding token exist'};
           }
           return user.id;
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw error;
        }
    }
    createToken(user){
        try {
            const result = jwt.sign(user, JWT_KEY,{expiresIn: '1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw error;
        }
    }

    isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong on service layer");
            throw error;
        }
    }
}

module.exports = UserService;