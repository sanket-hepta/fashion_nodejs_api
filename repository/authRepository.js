const bcrypt = require('bcryptjs');
const users = require('../models/users');
const jwt = require('jsonwebtoken');  
const dotenv = require("dotenv");
dotenv.config();

const register = async (data) => {
    
    //convert password in hash passwowrd
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(data.password, salt);
    data.password = hasPassword;
    try{
        return await users.insertMany(data);
    }catch(error){
        return error;
    }
}

const login = async (data) => {
    let user = await users.findOne({email: data.email});
    if(user){
        let validPassword = await bcrypt.compare(data.password, user.password);
        if(!validPassword){
            return null;
        }else{
            const {password, __v, ...userRes} = user._doc;
            const token = await jwt.sign({
                "email":user.email,
                "isAdmin":user.isAdmin
            }, process.env.SECRET_PASSPHRASE);

            userRes.token = await token;
            return userRes;
        }
    }else{
        return null;
    }
}

const getUser = async (id) => {
    return await users.findOne(
        {_id: id}
    ).select({__v:0});
}

const updateUser = async (data) => {
    try{
        console.log(data);
        return users.findByIdAndUpdate({_id: data.id}, data.updateData);
    }catch(error){
        return error;
    }
}

module.exports = {
    register,
    login,
    getUser,
    updateUser
}