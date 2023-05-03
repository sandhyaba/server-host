mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoinsModel = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    title: {
       type: String
    },
    amount:{
        type : Number
    },
    status:{
        type: Number,
        enum: ["success","pending","fail"]
    }
}, { timestamps: true })
module.exports = mongoose.model('coins', CoinsModel)
