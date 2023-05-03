const express = require('express');
const router = express.Router();
const { isAuth } = require('../config/auth');

const { addCoins, deleteCoins, updateCoins, getBalance, } = require("../controller/WalletController")
const { login, addReferral, completeProfile } = require("../controller/UserController")
const { addOffers, updateOffers, deleteOffers, addSetting, getSetting , getOffersList}
    = require("../controller/CommonController")
const { addRedeems, getRedeemList, updateRedeem, deleteRedeem } = require("../controller/WalletController")



router.post("/user/login", login)
router.post("/user/addReferral", isAuth, addReferral)
router.put("/user/completeProfile", isAuth, completeProfile)

router.post("/wallet/addCoins", isAuth, addCoins)
router.delete("/wallet/deleteCoins", isAuth, deleteCoins)
router.put("/wallet/updateCoins", isAuth, updateCoins)
router.get("/wallet/getBalance", isAuth, getBalance)

router.post("/wallet/redeem/add", isAuth, addRedeems)
router.get("/wallet/redeem/list", isAuth, getRedeemList)
router.put("/wallet/redeem/update", isAuth, updateRedeem)
router.delete("/wallet/redeem/delete", isAuth, deleteRedeem)

router.post("/offer/create", isAuth, addOffers)

router.put("/offer/update", isAuth, updateOffers)
router.delete("/offer/delete", isAuth, deleteOffers)
router.get("/offer/list",isAuth, getOffersList)

router.post("/setting/add", addSetting)
router.get("/setting/get", getSetting)

module.exports = router