const mongoose = require("mongoose");
mongoose.pluralize(null);

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },

    first_name:{
        type: String
    },

    last_name:{
        type: String
    },

    mobile_number:{
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    isAdmin:{
        type:Boolean,
        default: false
    }
}, 

{timestamps: true}

);

module.exports = mongoose.model("users", UserSchema);