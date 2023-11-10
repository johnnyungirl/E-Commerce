const { SuccessResponse } = require("../core/success.response")
const PasswordService = require("../services/password.service")
class PasswordController{
    changePass=async(req,res,next)=>{
        new SuccessResponse({
            message:'change password success',
            metadata:await PasswordService.changePassword(req.body)
        }).send(res)
    }
}
module.exports=new PasswordController()