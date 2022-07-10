const categories = require('../models/categories');

const index = async (data) => {

    let page_no = Math.max(1, data.page_no) - 1;
    let search_query = {is_active: {$ne:2}};
    if(data.query){
        search_query.category_name = {$regex: '.*' + data.query + '.*'};
    }

    return await categories
        .find(search_query)
        .limit(10)
        .skip(10 * page_no)
        .sort({
            createdAt: 'desc'
        })
        .select({__v:0})
}

const create = async (data) => {
    try{
        return await categories.insertMany(data);
    }catch(error){
        return error;
    }
}

const update = async (data) => {
    try{
        return categories.findByIdAndUpdate({_id: data.id, is_active: 1}, data.updateData);
    }catch(error){
        return error;
    }
}

const remove = async (id) => {
    try{

        let data = await categories.find({_id: id, is_active: 1});
        if(data){
            return categories.findByIdAndUpdate(id, {is_active: 2});
        }else{
            return null;
        }
    }catch(error){
        return error;
    }
}



module.exports = {
    index,
    create,
    update,
    remove
}