const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReferralsModel = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    referral_id:{
        type : Number
    }
}, { timestamps: true })
module.exports = mongoose.model('referrals', ReferralsModel)