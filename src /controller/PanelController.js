const UsersModel = require("../models/UsersModel")
const OffersModel = require("../models/OffersModel");
const CoinsModel = require("../models/CoinsModel")
const SettingModel = require("../models/SettingModel");
const NotificationModel = require("../models/NotificationModel");


const getUserList = async (req, res) => {
    try {

        let page = req.query.page ? req.query.page != 0 ? req.query.page : 1 : 1;
        let records = 50;
        let getUserList = await UsersModel.find();
        return res.status(200).send({ status: 1, msg: "User list", data: { records: records, page: page, list: getUserList } })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 0 })
    }
}

const deleteUser = async (req, res) => {
    try {

        const Id = req.body.id;
        var id = mongoose.Types.ObjectId(Id);

        let deleteUser = await UsersModel.deleteOne({ _id: id }).select({ isDeleted: 0 })
        if (deleteUser) {
            return res.status(200).send({ status: 1, msg: "Delete User Sucessfully", data: deleteUser })
        } else {
            return res.status(200).send({ status: 0, msg: "failed please try again" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: "internal server error" })
    }
}

const updateUserDetail = async (req, res) => {
    try {

        const Id = req.body._id;
        //var id = mongoose.Types.ObjectId(Id);
        const data = req.body;
        const { name, email, phone, social_id, platform, image, refferal_code } = data;

        if (!Id) {
            return res.status(200).send({ status: 0, message: "id is required", data: null })
        }

        let obj = {
            name: name,
            emial: email,
            phone: phone,
            social_id: social_id,
            platform: platform,
            image: image,
            refferal_code: refferal_code
        }
        
        let result = await UsersModel.findOneAndUpdate({ _id: Id }, obj, { new: true })
        if (result) {
            return res.status(200).send({ status: 1, message: " User updated successfully", data: result })
        } else {
            return res.status(200).send({ status: 0, message: "something wrong in user update", data: null })
        }
    }
    catch (error) {
        return res.status(500).send({ status: 0, message: "Something wrong Please try again", data: null })
    }
}

const getOffersList = async (req, res) => {
    try {
        let getOffersList = await OffersModel.find({});
        return res.status(200).send({ status: 1, msg: "Offers list", data: getOffersList })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 0 })
    }
}

const deleteOffer = async (req, res) => {
    try {
        const id = req.body.id;

        let deleteOffers = await OffersModel.deleteOne({ _id: id }).select({ isDeleted: 0 })
        if (deleteOffers) {
            return res.status(200).send({ status: 1, msg: "Offer Delete Sucessfully", data: deleteOffers })
        } else {
            return res.status(200).send({ status: 0, msg: "failed please try again" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: "internal server error" })
    }
}

const updateOffer = async (req, res) => {
    try {

        const id = req.body.id;
        const data = req.body;
        const { title, descriptions, icon, banner, link, amount, option_title, offer_type, status } = data;

        let obj = {
            title: title,
            descriptions: descriptions,
            icon: icon,
            banner: banner,
            link: link,
            amount: amount,
            option_title: option_title,
            offer_type: offer_type,
            status: status
        }
        let update = await OffersModel.findOneAndUpdate({ _id: id }, obj, { new: true })
        return res.status(200).send({ status: 1, message: "Offer Value Updated", data: update })
    }
    catch (error) {
        return res.status(500).send({ status: 0, message: "Something wrong Please try again", data: null })
    }
}

const getCoinList = async (req, res) => {
    try {

        let getCoinList = await CoinsModel.find();
        return res.status(200).send({ status: 1, msg: "Coins list", data: getCoinList })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 0 })
    }
}

const deleteCoin = async (req, res) => {
    try {

        const Id = req.body._id;

        let deleteCoin = await CoinsModel.deleteOne({ _id: Id }).select({ isDeleted: 0 })
        if (deleteCoin) {
            return res.status(200).send({ status: 1, msg: "Coin Delete Sucessfully", data: deleteCoin })
        } else {
            return res.status(200).send({ status: 0, msg: "failed please try again" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: "internal server error" })
    }
}

const updateCoin = async (req, res) => {
    try {

        const Id = req.body._id;
        const data = req.body;
        const { title, amount } = data;

        let obj = {
            title: title,
            amount: amount
        }

        let update = await CoinsModel.findOneAndUpdate({ _id: Id }, obj, { new: true })
        return res.status(200).send({ status: 1, message: "Value Updated", data: update })
    }
    catch (error) {
        return res.status(500).send({ status: 0, message: "Something wrong Please try again", data: null })
    }
}

const addCoin = async (req, res) => {
    try {
        const userId = req.userID;
        const data = req.body;
        const { title, amount } = data;

        if (!data) {
            return res.status(400).send({ status: 0, msg: "Please fill all fields" })
        }
        let obj = {
            userId: userId,
            title: title,
            amount: amount
        }
        let create = await CoinsModel.create(obj)
        return res.status(200).send({ status: 1, mag: "Coins add sucessfully", data: create })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 0, msg: "server error" })
    }
}

const addSetting = async (req, res) => {
    try {
        const data = req.body;
        const { privacy_policy, terms, min_version, daily_bonus, share_msg } = data;

        if (!data) {
            return res.status(400).send({ status: 0, msg: "Please fill all fields" })
        }
        let obj = {
            privacy_policy: privacy_policy,
            terms: terms,
            min_version: min_version,
            daily_bonus: daily_bonus,
            share_msg: share_msg
        }
        let create = await SettingModel.create(obj)
        if (create) {
            return res.status(200).send({ status: 1, message: "settings add sucessfully", data: create })
        }
        else {
            return res.status(500).send({ status: 0, message: "settings not found" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ status: 0, msg: "server error" })
    }
}

const getSetting = async (req, res) => {
    try {
        let getSetting = await SettingModel.findOne();
        return res.status(200).send({ status: 1, msg: "Setting list", data: getSetting })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 0 })
    }
}

const updateSetting = async (req, res) => {
    try {

        const Id = req.body._id;
        const data = req.body;
        const {privacy_policy, terms, min_version, daily_bonus, share_msg } = data;

        let obj = {
           privacy_policy: privacy_policy,
           terms: terms,
           min_version : min_version,
           daily_bonus : daily_bonus,
           share_msg : share_msg
        }

        let update = await SettingModel.findOneAndUpdate({ _id: Id }, obj, { new: true })
        return res.status(200).send({ status: 1, message: "Value Updated", data: update })
    }
    catch (error) {
        return res.status(500).send({ status: 0, message: "Something wrong Please try again", data: null })
    }
}

const deleteSetting = async (req, res) => {
    try {

        const Id = req.body._id;

        let deleteSetting = await SettingModel.deleteOne({ _id: Id }).select({ isDeleted: 0 })
        if (deleteSetting) {
            return res.status(200).send({ status: 1, msg: "Delete Sucessfully", data: deleteSetting })
        } else {
            return res.status(200).send({ status: 0, msg: "failed please try again" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: "internal server error" })
    }
}

const pushNotification = async (req, res) => {
    try {
        const data = req.body;
        const { title, detail, sendTo, icon_url } = data;

        if (!data) {
            return res.status(400).send({ status: 0, msg: "Please fill all fields" })
        }
        let obj = {
           title: title,
           detail: detail,
           sendTo : sendTo,
           icon_url: icon_url
        }
        let create = await NotificationModel.create(obj)
        return res.status(200).send({ status: 1, mag: "push notification sucessfully", data: create })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 0, msg: "server error" })
    }
}

const getNotification = async (req, res) => {
    try {
        let getNotification = await NotificationModel.find();
        return res.status(200).send({ status: 1, msg: "Notification list", data: getNotification })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 0 })
    }
}

const deleteNotification = async (req, res) => {
    try {

        const Id = req.body._id;

        let deleteNotification = await NotificationModel.deleteOne({ _id: Id }).select({ isDeleted: 0 })
        if (deleteNotification) {
            return res.status(200).send({ status: 1, msg: "Delete Sucessfully", data: deleteNotification })
        } else {
            return res.status(200).send({ status: 0, msg: "failed please try again" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: "internal server error" })
    }
}
module.exports = {
    getUserList, deleteUser, updateUserDetail, getOffersList, deleteOffer, updateOffer,
    getCoinList, deleteCoin, updateCoin, addCoin , addSetting , getSetting , updateSetting , deleteSetting,
    pushNotification , getNotification , deleteNotification
}