const orderRepository = require('../repository/orderRepository');


const create = async (request, response, next) => {
    try{
        let data = request.body;
        let result = await orderRepository.create(data);

        if(result){
            let customObj = { status: true, statusCode: 200, message: "Order created successfully."}
            next(customObj);
        }else{
            let customObj = { status: true, statusCode: 200, message: "Failed to save the data."}
            next(customObj);
        }
    }catch(error){
        next(error);
    }
}

module.exports = {
    create
}