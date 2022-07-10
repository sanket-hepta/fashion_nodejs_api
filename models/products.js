const mongoose = require("mongoose");
mongoose.pluralize(null);
const slug = require('mongoose-url-slugs');

const productSchema = new mongoose.Schema({
    product_name:{
        type: String,
        required: true,
        trim: true
    },

    category_id:{
        type: String,
        required: true,
        trim:true
    },

    image_url:{
        type: String,
        trim: true
    },

    slug:{
        type: String,
        trim: true
    },

    description:{
        type: String,
        required: true,
        trim: true
    },

    price:{
        type: Number,
        required: true,
        default: 0
    },

    is_active:{
        type: Number,
        default: 1
    }
},
{timestamps: true}
);

productSchema.plugin(slug('product_name', {field:  'slug'}));

module.exports = mongoose.model("products", productSchema);