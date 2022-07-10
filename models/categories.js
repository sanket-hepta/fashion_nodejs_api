const mongoose = require("mongoose");
mongoose.pluralize(null);
const slug = require('mongoose-url-slugs');

const categorySchema = new mongoose.Schema({
    category_name:{
        type: String,
        required: true,
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

    is_active:{
        type: Number,
        default: 1
    }
},
{timestamps: true}
);

categorySchema.plugin(slug('category_name', {field:  'slug'}));

module.exports = mongoose.model("categories", categorySchema);