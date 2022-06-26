const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');  
const dotenv = require("dotenv");
dotenv.config();

const register = async (data) => {
    
    //convert password in hash passwowrd
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(data.password, salt);
    data.password = hasPassword;
    try{
        return await Users.insertMany(data);
    }catch(error){
        return error;
    }
}

const login = async (data) => {
    let user = await Users.findOne({email: data.email});
    if(user){
        let validPassword = await bcrypt.compare(data.password, user.password);
        if(!validPassword){
            return null;
        }else{
            const {password, __v, ...userRes} = user._doc;
            const token = await jwt.sign({
                "email":user.email,
                "type_of_user":user.isAdmin
            }, process.env.SECRET_PASSPHRASE);

            userRes.token = await token;
            return userRes;
        }
    }else{
        return null;
    }
}

module.exports = {
    register,
    login
}