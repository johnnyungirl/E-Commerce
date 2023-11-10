'use strict'
const express=require('express')
const { asyncHandler } = require('../../auth/checkAuth')
const passwordController = require('../../controllers/password.controller')
const { authentication } = require('../../auth/authUtils')

const router=express.Router()
router.use(authentication)
router.patch('/change',asyncHandler(passwordController.changePass))
module.exports=router