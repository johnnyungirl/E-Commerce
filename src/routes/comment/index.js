'use strict'
const express=require(`express`)
const { asyncHandler } = require("../../auth/checkAuth")
const commentController = require("../../controllers/comment.controller")
const { authentication } = require("../../auth/authUtils")
const router=express.Router()
router.use(authentication)
router.post('/create',asyncHandler(commentController.createComment))
router.delete('/delete',asyncHandler(commentController.deleteComment))
router.get('/list',asyncHandler(commentController.listCommentByProductId))
module.exports=router
