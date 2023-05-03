const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RedeemsModel = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    detail: {
        type: String
     },
    method: {
       type: String
    },
    amount:{
        type : Number
    },
    status:{
        type: String,
        enum:["success", "pending", "fail"]
    }
}, { timestamps: true })
module.exports = mongoose.model('redeems', RedeemsModel)