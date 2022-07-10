const mongoose = require("mongoose");
mongoose.pluralize(null);

const ordersSchema = new mongoose.Schema({
    session_id:{
        type: String,
        required: true,
        trim: true
    },

    cart: [
        {
            product_name:String,
            image_url:String,
            price:Number,
            quantity:Number,
            is_active:Number
        }
    ],

    address: {
        first_name: String,
        last_name: String,
        email: String,
        mobile: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
    },

    total_amount:{
        type: Number,
        required: true,
        trim: true
    },

    payment_method:{
        type: String,
        required: true,
        trim: true
    },

    transaction_date:{
        type: String,
        required: true,
        trim: true
    }
},
{timestamps: true}
);

module.exports = mongoose.model("orders", ordersSchema);