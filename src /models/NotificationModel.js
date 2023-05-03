const mongoose = require("mongoose");

const NotificationModel = new mongoose.Schema({

    title: {
        type: String
    },
    detail: {
        type: String
    },
    sendTo: {
        type: String
    },
    icon_url: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model('notifications', NotificationModel)