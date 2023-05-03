const OffersModel = require("../models/OffersModel");
const SettingModel = require("../models/SettingModel");


const addOffers = async (req, res) => {
    try {
        const data = req.body;
        const { title, descriptions, icon, banner, link, amount, option_title, offer_type, status } = data;

        if (!data) {
            return res.status(400).send({ status: 0, msg: "Please fill all fields" })
        }
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

        let create = await OffersModel.create(obj)
        return res.status(200).send({ status: 1, mag: "Offers added sucessfully", data: create })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 0, msg: "server error" })
    }
}

const updateOffers = async (req, res) => {
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

const deleteOffers = async (req, res) => {
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
const getOffersList = async (req, res) => {
    try {
        let getOffersList = await OffersModel.find({});
        return res.status(200).send({ status: 1, msg: "Offers list", data: getOffersList })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 0 })
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
module.exports = { addOffers, deleteOffers, updateOffers, addSetting , getSetting , getOffersList}

