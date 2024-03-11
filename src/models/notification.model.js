// noti_type
// noti_senderId
// noti_receiverId
// noti_content
// noti_options
const mongoose=require(`mongoose`)
const DOCUMENT='Notification'
const COLLECTION='Notifications'

const NotificationSchema=new mongoose.Schema({
    noti_type:{type:String,enum:[`ORDER-001`,`ORDER-002`,`PROMOTION-001`,`SHOP-001`],require:true},
    noti_senderId:{type:mongoose.Schema.Types.ObjectId,require:true},
    noti_receiverId:{type:Number,require:true},
    noti_content:{type:String,require:true},
    noti_options:{type:Object,default:{}}
},{
    collection:COLLECTION,
    timestamps:true
})
module.exports=mongoose.model(DOCUMENT,NotificationSchema)