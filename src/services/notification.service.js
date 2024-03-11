const notificationModel = require("../models/notification.model")

class NotificationService{
    static async pushNotifyToSystem({
        type,
        senderId,
        receiverId,
        options={}
    }){
        let content
        if(type===`SHOP-001`){
            content="@@@ vua moi them 1 san pham:@@@@"
        }else if(type==='PROMOTION-001'){
            content="@@@ vua moi them mot voucher:@@@@"
        }
        const newNoti=await notificationModel.create({
            noti_type:type,
            noti_senderId:senderId,
            noti_receiverId:receiverId,
            noti_contentll:content,
            noti_options:options
        })
        return newNoti
    }
    static async listNotificationByUser({
        userId=1,
        type=`ALL`,
        isRead=0
    }){
       const match={noti_receiverId:userId}
       if(type!==`ALL`){
            match['noti_type']=type
       }
       return await notificationModel.aggregate([
        {
            $match:match
        },{
            $project:{
                noti_type:1,
                noti_senderId:1,
                noti_receiverId:1,
                noti_content:1,
                noti_options:1,
                createAt:1            
            }
        }
       ])
    }
}
module.exports=NotificationService
