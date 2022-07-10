const orders = require("../models/orders");

const create = async (data) => {
    try{
        return await orders.insertMany(data);
    }catch(error){
        return error;
    }
}

module.exports = {
    create
}