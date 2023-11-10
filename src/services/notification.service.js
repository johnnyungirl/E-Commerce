const notificationModel = require("../models/notification.model")




const pushNotifyToSystem=async({
    type='SHOP-001',
    senderId=1,
    receiverId=1,
    options={}
})=>{
    let noti_content
    if(type==`SHOP-001`){
        noti_content=`@@@@ vua moi them mot san pham: @@@@`
    }
    else if(type==`PROMOTION-001`){
        noti_content=`@@@@ vua moi them mot voucher: @@@@`
    }
    const newNoti=await notificationModel.create({
        noti_type:type,
        noti_content:noti_content,
        noti_senderId:senderId,
        noti_receiverId:receiverId,
        noti_options:options
    })
    return newNoti
}
const listNotiByUser=async({
    userId='1',
    type='ALL',
    isRead=0
})=>{
    const match={noti_receiverId:userId}
    if(type!=='ALL'){
        match['noti_type']=type
    }
    console.log(`match:::::::::${match}`)
    return await notificationModel.aggregate([
        {
            $match:match
        },
        {
            $project:{
                noti_type:1,
                noti_senderId:1,
                noti_receiverId:1,
                noti_content:1,
                createAt:1,
                noti_options:1
            }
        }
    ])

}
module.exports={
    pushNotifyToSystem,
    listNotiByUser
}

