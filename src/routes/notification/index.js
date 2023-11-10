'use strict'
const express=require(`express`)
const { asyncHandler } = require("../../auth/checkAuth")
const { authentication } = require("../../auth/authUtils")
const notificationController = require("../../controllers/notification.controller")
const router=express.Router()
router.use(authentication)
router.get('/list',asyncHandler(notificationController.listNotificationByUser))
module.exports=router
