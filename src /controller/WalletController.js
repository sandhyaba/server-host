const CoinsModel = require("../models/CoinsModel")
const UsersModel = require("../models/UsersModel")
const RedeemsModel = require("../models/RedeemsModel")
const mongoose = require("mongoose");

async function getBal(userId) {
    try {
        const query = [
            {
                $match: { userId: mongoose.Types.ObjectId(userId) }

            },
            {
                $group:
                {
                    _id: 0, CoinBalance: { $sum: "$amount" }
                }
            },
            {
                $lookup: {
                    from: "redeems",
                    pipeline: [
                        {
                            $match: { userId: mongoose.Types.ObjectId(userId) }

                        },
                        {
                            $group: {
                                _id: 0,
                                RedeemBalance: {
                                    $sum: "$amount",
                                },
                            },
                        },],
                    as: "RedeemBalance",
                },
            },
            { $unwind: "$RedeemBalance" },
            {
                $project: {
                    _id: 0,
                    CoinBalance: 1,
                    RedeBalance: "$RedeemBalance.RedeemBalance"
                }
            },
            {
                $project: {
                    _id: 0,
                    balance: { $subtract: ["$CoinBalance", "$RedeBalance"] }
                }
            }
        ]
        let data = await CoinsModel.aggregate(query)
        return data;
    }
    catch (error) {
        return error;
    }
}

const addCoins = async (req, res) => {
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

const updateCoins = async (req, res) => {
    try {

        const name = req.body.id;
        var id = mongoose.Types.ObjectId(name);
        const data = req.body;
        const { title, amount } = data;

        let obj = {
            title: title,
            amount: amount
        }

        let update = await CoinsModel.findOneAndUpdate({ _id: id }, obj, { new: true })
        return res.status(200).send({ status: 1, message: "Value Updated", data: update })
    }
    catch (error) {
        return res.status(500).send({ status: 0, message: "Something wrong Please try again", data: null })
    }
}

const deleteCoins = async (req, res) => {
    try {

        const name = req.body.id;
        var id = mongoose.Types.ObjectId(name);

        let deleteCoin = await CoinsModel.deleteOne({ _id: id }).select({ isDeleted: 0 })
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

const getBalance = async (req, res) => {

    try {
        let userId = req.userID;
        let balance = await getBal(userId);
        // console.log(balance);
        return res.status(200).send({ status: 1, message: "success", data: balance })

    }
    catch (error) {
        return res.status(500).send({ status: 0, message: "Something wrong Please try again", data: null })
    }
}

const addRedeems = async (req, res) => {
    try {

        const userId = req.userID;
        const data = req.body;
        const { detail, method, amount, status } = data;

        if (!data) {
            return res.status(400).send({ status: 0, msg: "Please fill all fields" })
        }

        if (amount < 5000 ){
            return res.status(400).send({ status: 0, msg: "Your Amount is Less Than 5000 Rupees." })
        }
        if ( amount % 5000 != 0  ) {
            return res.status(400).send({ status: 0, msg: "Your amount is not multiple of 5000." })
        }

        let balance = await getBal(userId);
        if (balance[0].balance < amount) {
            return res.status(400).send({ status: 0, msg: "No enough balance in wallet" })
        }
        let obj = {
            userId: userId,
            detail: detail,
            method: method,
            amount: amount,
            status: status
        }
        let create = await RedeemsModel.create(obj)
        return res.status(200).send({ status: 1, mag: "Redeems add sucessfully", data: create })

    } catch (error) {
        return res.status(500).send({ status: 0, msg: "server error" })
    }
}

const getRedeemList = async (req, res) => {
    try {
        const userId = req.userID;

        let getRedeemList = await RedeemsModel.find({ userId: userId });
        return res.status(200).send({ status: 1, msg: "Redeems list", data: getRedeemList })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: 0 })
    }
}

const updateRedeem = async (req, res) => {
    try {
        const id = req.body.id;
        const data = req.body;
        const { detail, method, amount, status } = data;

        let obj = {
            detail: detail,
            method: method,
            amount: amount,
            status: status
        }
        let update = await RedeemsModel.findOneAndUpdate({ _id: id }, obj, { new: true })
        //console.log(update)
        return res.status(200).send({ status: 1, message: "Value Updated", data: update })
    }
    catch (error) {
        return res.status(500).send({ status: 0, message: "Something wrong Please try again", data: null })
    }
}

const deleteRedeem = async (req, res) => {
    try {

        const id = req.body.id;

        let deleteRedeem = await RedeemsModel.deleteOne({ _id: id }).select({ isDeleted: 0 })
        if (deleteRedeem) {
            return res.status(200).send({ status: 1, msg: "Redeem Delete Sucessfully", data: deleteRedeem })
        } else {
            return res.status(200).send({ status: 0, msg: "failed please try again" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: "internal server error" })
    }
}

module.exports = {
    addCoins, deleteCoins, updateCoins, getBalance, addRedeems, getRedeemList, updateRedeem, deleteRedeem
}


    
       
