`use strict`
const express=require(`express`)
const profileController = require("../../controllers/profile.controller")
const { grantAccess } = require("../../middleware/rbac")
require('../../middleware/rbac')
const router=express.Router()
//admin
router.get(`/viewAny`,grantAccess('readAny','profile'),profileController.profiles)
//shop
router.get(`/viewOwn`,grantAccess(`readAny`,`profile`),profileController.profile)
module.exports=router