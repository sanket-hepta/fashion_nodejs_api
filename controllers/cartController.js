const cartRepository = require('../repository/cartRepository');

const index = async (request, response, next) => {
    try{
        let query = request.query;
        let result = await cartRepository.index(query);
        if(result){

            let total_amount = await cartRepository.getTotalAmount(result);

            let customObj = { status: true, statusCode: 200, message: "Success.", result : {data: result, total_amount: total_amount}}
            next(customObj);
        }else{
            let customObj = { status: true, statusCode: 401, message: "Failed to get the data."}
            next(customObj);
        }
    }catch(error){
        next(error);
    }
}


const create = async (request, response, next) => {
    try{
        let data = request.body;
        let result = await cartRepository.create(data);

        let query = {session_id: data.session_id};
        result = await cartRepository.index(query);

        if(result){

            let total_amount = await cartRepository.getTotalAmount(result);

            let customObj = { status: true, statusCode: 200, message: "Item added successfully.", result : {data: result, total_amount:total_amount}}
            next(customObj);
        }else{
            let customObj = { status: true, statusCode: 401, message: "Failed to save the data."}
            next(customObj);
        }
    }catch(error){
        next(error);
    }
}


const remove = async (request, response, next) => {
    try{
        let id = request.params.id;
        let cartResult = await cartRepository.getCartDetails(id)
        let result = await cartRepository.remove(id);

        
        if(result){

            let query = {session_id: cartResult.session_id};
            result = await cartRepository.index(query);
            let total_amount = await cartRepository.getTotalAmount(result);

            let customObj = { status: true, statusCode: 200, message: "Record deleted successfully.", result : {data: result, total_amount:total_amount}}
            next(customObj);
        }else{
            let customObj = { status: false, statusCode: 401, message: "Failed to delete the data."}
            next(customObj);
        }
    }catch(error){
        next(error);
    }
}


module.exports = {
    index,
    create,
    remove
}