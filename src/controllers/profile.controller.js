`use strict`
const { SuccessResponse } = require("../core/success.response")
const dataProfiles=[
    {
        user_id:1,
        user_name:"ME",
        user_avar:'image/1'
    },
    {
        user_id:2,
        user_name:"DEN",
        user_avar:`image/2`
    },
    {
        user_id:3,
        user_name:"TIEN",
        user_avar:`image/3`
    }

]
class ProfileController{
    //admin 
    profiles=async(req,res,next)=>{
        new SuccessResponse({
            message:`view all profiles`,
            metadata:dataProfiles
        }).send(res)
    }
    //shop
    profile=async(req,res,next)=>{
        new SuccessResponse({
            message:`view all profiles`,
            metadata:{
                user_id:3,
                user_name:"TIEN",
                user_avar:'image/3'
            }
        }).send(res)
    }
}
module.exports=new ProfileController()