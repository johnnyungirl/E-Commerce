const { default: mongoose } = require("mongoose")

require(`mongoose`)
const COLLECTION_NAME="Notifications"
const DOCUMENT_NAME="Notification"
const notificationSchema=new mongoose.Schema({
    noti_type:{type:String ,enum:[`ORDER-001`,`ORDER-002`,`PROMOTION-001`,`SHOP-001`],required:true},
    noti_senderId:{type:mongoose.Types.ObjectId,required:true},
    noti_receiverId:{type:String,required:true},
    noti_content:{type:String,required:true},
    noti_options:{type:Object,default:{}}
},{
    timestamps:true,
    collection:COLLECTION_NAME
})
module.exports=mongoose.model(DOCUMENT_NAME,notificationSchema)