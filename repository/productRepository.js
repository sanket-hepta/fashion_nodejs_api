const products = require('../models/products');


const index = async (data) => {

    let page_no = Math.max(1, data.page_no) - 1;
    let search_query = {is_active: {$ne:2}};
    if(data.query){
        search_query.product_name = {$regex: '.*' + data.query + '.*'};
    }

    return await products
        .find(search_query)
        .limit(100)
        .skip(100 * page_no)
        .sort({
            createdAt: 'desc'
        })
        .select({__v:0})
}

const create = async (data) => {
    try{
        return await products.insertMany(data);
    }catch(error){
        return error;
    }
}

const update = async (data) => {
    try{
        return products.findByIdAndUpdate({_id: data.id, is_active: 1}, data.updateData);
    }catch(error){
        return error;
    }
}

const remove = async (id) => {
    try{

        let data = await products.find({_id: id, is_active: 1});
        if(data){
            return products.findByIdAndUpdate(id, {is_active: 2});
        }else{
            return null;
        }
    }catch(error){
        return error;
    }
}

const getProduct = async (slug) => {
    return await products.findOne(
        {slug: slug}
    ).select({__v:0});
}

module.exports = {
    index,
    create,
    update,
    remove,
    getProduct
}