const mongoose = require("mongoose");

const SettingModel = new mongoose.Schema({
    min_version: {
        type: String
    },
    privacy_policy:{
        type : String
    },
    daily_bonus:{
        type : String
    },
    terms:{
        type : String
    },
    share_msg:{
        type : String
    }

}, { timestamps: true })
module.exports = mongoose.model('setting', SettingModel)