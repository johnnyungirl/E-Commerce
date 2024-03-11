'use strict'
const express=require(`express`)
const rbacController = require("../../controllers/rbac.controller")
const asyncHandler = require("../../helpers/asyncHandler")
const router=express.Router()
router.post('/createrole',asyncHandler(rbacController.newRole))
router.post('/createresource',asyncHandler(rbacController.newResource))
router.get('/listresource',asyncHandler(rbacController.listResource))
router.get(`/listroles`,asyncHandler(rbacController.listRoles))

module.exports=router