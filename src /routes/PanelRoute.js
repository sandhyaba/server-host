const express = require('express');
const router = express.Router();
const { isAuth } = require('../config/auth');

const { getUserList , deleteUser, updateUserDetail, getOffersList , deleteOffer , updateOffer, getCoinList ,
     deleteCoin , updateCoin , addCoin, addSetting, getSetting, updateSetting, deleteSetting, pushNotification, getNotification, deleteNotification} = 
     require("../controller/PanelController")


router.get("/panel/users/getall", getUserList)
router.delete("/panel/user/delete", deleteUser)
router.put("/panel/user/update", updateUserDetail)

router.get("/panel/offer/list", getOffersList)
router.delete("/panel/offer/delete", deleteOffer)
router.put("/panel/offer/update", updateOffer)

router.get("/panel/coin/list", getCoinList)
router.delete("/panel/coin/delete", deleteCoin)
router.put("/panel/coin/update", updateCoin)
router.post("/panel/coin/add",  addCoin)

router.post("/panel/setting/add" , addSetting)
router.get("/panel/setting/list", getSetting)
router.put("/panel/setting/update", updateSetting)
router.delete("/panel/setting/delete", deleteSetting)

router.post("/panel/notification/push" , pushNotification)
router.get("/panel/notification/list", getNotification)
router.delete("/panel/notification/delete", deleteNotification)

module.exports = router
