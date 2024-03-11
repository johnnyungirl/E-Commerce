const express=require(`express`)
const upload = require("../../configs/configs.multer")
const uploadController = require("../../controllers/upload.controller")
const router=express.Router()
router.post(`/uploadimage`,upload.single(`file`),uploadController.uploadImageFromLocal)
router.post(`/uploadfileimages`,upload.array(`files`,3),uploadController.uploadImageFromFiles)
module.exports=router