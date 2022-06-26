const authRepository = require("../repository/authRepository");
const dotenv = require("dotenv");

dotenv.config();

//http://localhost:3000/api/auth/sign-up
const register = async (request, response, next) => {
    try{
        let user = request.body;
        let result = await authRepository.register(user);
        if(result){
            let customObj = { status: true, statusCode: 201, message: "Success.", result : {data: result}}
            next(customObj);
        }else{
            let customObj = { status: true, statusCode: 401, message: "Failed to save the data."}
            next(customObj);
        }
    }catch(error){
        next(error);
    }
}

//http://localhost:3000/api/auth/sign-in
const login = async (request, response, next) => {
    try{
        let data = request.body;
        let result = await authRepository.login(data);
        if(!result){
            let error = new Error("Invalid email id or password");
            error.status = false;
            error.statusCode = 403;
            throw error;
        }else{
            let customObj = { status: true, statusCode: 200, message: "Success.", result : {data: result}}
            next(customObj);
        }

    }catch(error){
        next(error);
    }
}

module.exports = {
    register,
    login
}