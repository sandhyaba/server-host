const mongoose = require("mongoose");

const UsersModel = new mongoose.Schema({
    name: {
       type: String
    },
    email: {
        type: String
    },
    phone :{
        type: Number
    },
    social_id:{
        type : String
    },
    platform:{
        type : String
    },
    image:{
        type : String
    },
    referral_code:{
        type : Number
    }
}, { timestamps: true })
module.exports = mongoose.model('users', UsersModel)