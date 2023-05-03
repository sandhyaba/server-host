const mongoose = require("mongoose");

const Device_infoModel = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    udid :{
        type: String
    },
    deviceName:{
        type : String
    },
    model:{
        type: String
    },
    version:{
        type: String
    }
    
}, { timestamps: true })
module.exports = mongoose.model('device_info', Device_infoModel)