const { BadRequestError } = require("../core/error.response")
const { SuccessResponse } = require("../core/success.response")
const uploadService = require("../services/upload.service")

class uploadController{
    uploadImageFromLocal=async (req,res,next)=>{
        if(req.file==null){
            res.status(403).json({
                status:`error`,
                code:403,
                message:`Image path no found,check again`
            })
        }
        new SuccessResponse({
            statusCode:201,
            message:"upload image success",
            metadata: await uploadService.uploadImageFromLocal(req.file.path)
        }).send(res)
    }
    uploadImageFromFiles=async (req,res,next)=>{
        if(req.files==null){
            res.status(403).json({
                status:`error`,
                code:403,
                message:`Image file no found,check again`
            })
        }
        new SuccessResponse({
            statusCode:201,
            message:"upload image success",
            metadata: await uploadService.uploadImageFromFiles(req.files)
        }).send(res)
    }

}
module.exports=new uploadController()