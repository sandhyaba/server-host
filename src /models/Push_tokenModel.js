const mongoose = require("mongoose");

const Push_tokenModel = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    token:{
        type : String
    }
}, { timestamps: true })
module.exports = mongoose.model('push_token', Push_tokenModel)
