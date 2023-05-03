const mongoose = require("mongoose");

const OffersModel = new mongoose.Schema({
    title: {
        type: String
     },
     descriptions: {
       type: String
    },  
    icon:{
        type: String
    },
    banner:{
        type: String
    },
    link:{
        type: String
    },
    amount:{
        type: Number
    },
    option_title:{
        type: String
    },
    option_type:{
        type: String,
        enum : ["Large" , "Medium" , "Small"],
        default: "Medium"
    },
    status:{
        type: String,
        enum: [0 , 1],
        default : 0
    }
}, { timestamps: true })
module.exports = mongoose.model('offers', OffersModel)