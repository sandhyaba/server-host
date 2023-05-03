const UsersModel = require("../models/UsersModel")
const ReferralsModel = require("../models/ReferralsModel")
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const data = req.body;
    const { token } = data
    if (!token) {
        return res.status(400).send({ status: 0, message: "Please pass token", data: null })
    }
    let decode = jwt.decode(token)
    if (!decode) {
        return res.status(400).send({ status: 0, message: "Invalid token", data: null })
    }
    //console.log("Google Decode : ",decode)
    let findUser = await UsersModel.findOne({ email: decode.email })
    if (findUser) {
        const data = findUser.toObject({ flattenMaps: true });
        let token = jwt.sign({ userId: findUser._id, email: findUser.email, phone: findUser.phone }, 'USER')
        data['isSignup'] = 0
        data['token'] = token
        delete data.__v
        delete data.updatedAt
        delete data.otp
        return res.status(200).send({ status: 1, message: "Login Success", data: data })
    } else {
        var referCode = Math.floor(100000 + Math.random() * 900000);
        let registerObj = {
            phone: null,
            name: decode.name,
            email: decode.email,
            phone: null,
            social_platform: "google",
            social_id: decode.sub,
            image: decode.picture,
            referral_code: referCode

        }
        let create = await UsersModel.create(registerObj)
        if (create) {
            const data = create.toObject({ flattenMaps: true });
            let token = jwt.sign({ userId: create._id, email: create.email, phone: create.phone }, 'USER')
            data['isSignup'] = 1
            data['token'] = token
            delete data.__v
            delete data.updatedAt
            delete data.otp
            return res.status(200).send({ status: 1, message: "Signup Sucessfully", data: data })
        }
        return res.status(200).send({ status: 0, message: "Something wrong in create user. Please try again", data: null })
    }
}

const addReferral = async (req, res) => {
    try {
        const userId = req.userID;
        let data = req.body;
        const { referral_code } = data;
        if (!referral_code) {
            return res.status(400).send({ status: 0, message: "Please pass code", data: null })
        }
        let findUser = await UsersModel.findOne({ referral_code: referral_code })
        if (findUser) {
            let Obj = {
                userId: findUser._id,
                referral_id: referral_code
            }

            let create = await ReferralsModel.create(Obj)
            return res.status(200).send({ status: 1, message: "Find Referral Code Sucessfully", data: create })

        } else {
            return res.status(200).send({ status: 0, message: "Invalid Referral Code", data: null })
        }
    } catch (error) {
        return res.status(500).send({ status: 0, message: "Something wrong in referral code.Please try again", data: null })
    }
}

const completeProfile = async (req, res) => {
    try {
        const userID = req.userID;
        const data = req.body;
        const { name, phone } = data;

        let obj = {
            name: name,
            phone: phone.toString()
        }
        // console.log(req)
        let update = await UsersModel.findOneAndUpdate({ _id: userID}, obj, { new: true })
        
        //console.log(obj)
        return res.status(200).send({ status: 1, message: "Value Updated", data: update })
    }
    catch (error) {
        return res.status(500).send({ status: 0, message: "Something wrong Please try again", data: null })
    }
}



module.exports = { login, addReferral, completeProfile }
