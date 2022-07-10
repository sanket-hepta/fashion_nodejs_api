const mongoose = require("mongoose");
mongoose.pluralize(null);

const cartSchema = new mongoose.Schema({
    session_id:{
        type: String,
        required: true,
        trim: true
    },

    product_name:{
        type: String,
        trim: true
    },

    image_url:{
        type: String,
        trim: true
    },

    price:{
        type: Number,
        trim: true
    },

    quantity:{
        type: Number,
        trim: true
    },

    is_active:{
        type: Number,
        default: 1
    }
},
{timestamps: true}
);

module.exports = mongoose.model("cart", cartSchema);