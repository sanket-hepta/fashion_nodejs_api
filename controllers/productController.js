const productRepository = require('../repository/productRepository');

const index = async (request, response, next) => {
    try{
        let query = request.query;
        let result = await productRepository.index(query);
        if(result){
            let customObj = { status: true, statusCode: 200, message: "Success.", result : {data: result}}
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
        let result = await productRepository.create(data);
        if(result){
            let customObj = { status: true, statusCode: 200, message: "Record created successfully.", result : {data: result}}
            next(customObj);
        }else{
            let customObj = { status: true, statusCode: 401, message: "Failed to save the data."}
            next(customObj);
        }
    }catch(error){
        next(error);
    }
}

const update = async (request, response, next) => {
    try{
        let a = request.body;
        let data = {};
        data.id = a.id;
        data.updateData = a;
        let result = await productRepository.update(data);
        if(result){
            let customObj = { status: true, statusCode: 201, message: "Record updated successfully."}
            next(customObj);
        }else{
            let customObj = { status: false, statusCode: 401, message: "Failed to update the data."}
            next(customObj);
        }
    }catch(error){
        next(error);
    }
}

const remove = async (request, response, next) => {
    try{
        let data = request.params.id;
        let result = await productRepository.remove(data);
        if(result){
            let customObj = { status: true, statusCode: 200, message: "Record deleted successfully."}
            next(customObj);
        }else{
            let customObj = { status: false, statusCode: 401, message: "Failed to delete the data."}
            next(customObj);
        }
    }catch(error){
        next(error);
    }
}


const getProduct = async (request, response, next) => {
    try{
        let slug = request.params.slug;
        let result = await productRepository.getProduct(slug);
        if(result){
            let customObj = { status: true, statusCode: 200, message: "Success.", result : {data: result}}
            next(customObj);
        }else{
            let customObj = { status: false, statusCode: 401, message: "Failed to get the data."}
            next(customObj);
        }
    }catch(error){
        next(error);
    }
}

module.exports = {
    index,
    create,
    update,
    remove,
    getProduct
}