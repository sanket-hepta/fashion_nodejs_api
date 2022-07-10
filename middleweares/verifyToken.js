const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_PASSPHRASE, (error, user) => {
            if(error){
                let customObj = { status: false, statusCode: 403, message: "API validation failed."}
                next(customObj);
            }else{
                request.user = user;
                next();
            }
        });
    }else{
        let customObj = { status: false, statusCode: 401, message: "API validation failed."}
        next(customObj);
    }
}

const isAdmin = (request, response, next) => {
    
    if(request.user.isAdmin === true){
        next();
    }else{
        let customObj = { status: false, statusCode: 401, message: "API validation failed."}
        next(customObj);
    }
}

module.exports = {
    verifyToken,
    isAdmin
}