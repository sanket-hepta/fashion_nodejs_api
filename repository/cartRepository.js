const cart = require("../models/cart");

const index = async (data) => {

    let search_query = {is_active: {$eq:1}};
    if(data.session_id){
        search_query.session_id = {$eq: data.session_id};
    }

    return await cart
        .find(search_query)
        .sort({
            createdAt: 'desc'
        })
        .select({__v:0})
}

const create = async (data) => {
    try{
        return await cart.insertMany(data);
    }catch(error){
        return error;
    }
}

const remove = async (id) => {
    try{
        let data = await cart.find({_id: id, is_active: 1});
        if(data){
            return cart.findByIdAndUpdate(id, {is_active: 2});
        }else{
            return null;
        }
    }catch(error){
        return error;
    }
}

const getTotalAmount = async (data) => {
    let total_amount = 0;
    await data.forEach(element => {
        total_amount = total_amount + parseInt(element.price);
    });

    return total_amount;
}

const getCartDetails = async (id) => {
    let data = await cart.find({_id: id, is_active: 1});
    return data;
}

module.exports = {
    index,
    create,
    remove,
    getCartDetails,
    getTotalAmount
}