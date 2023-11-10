'use strict'
const { SuccessResponse } = require('../core/success.response')
const NotificationService = require('../services/notification.service')

class NotificationController{
    listNotificationByUser=async (req,res,next)=>{
        new SuccessResponse({
            message:'list notification success',
            metadata: await NotificationService.listNotiByUser(req.query)
        }).send(res)
    }
  
}
module.exports=new NotificationController()