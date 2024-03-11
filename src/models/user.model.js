const mongoose=require(`mongoose`)
const DOCUMENT_NAME=`User`
const COLLECTION_NAME=`Users`

const userSchema=new mongoose.Schema({
    user_id :{type:Number,require:true},
    user_slug :{type:String,require:true},
    user_name :{type:String,default:""},
    user_password :{type:String,default:""},
    user_saft :{type:String,default:""},
    user_email :{type:String,require:true},
    user_phone :{type:String,default:""},
    user_sex :{type:String,default:""},
    user_avatar :{type:String,default:null},
    user_date_of_birth :{type:Date,default:null},
    user_role :{type:mongoose.Schema.Types.ObjectId,ref:"Role"},
    user_status :{type:String,default:"pending",enum:['pending','active','block']},
},{
    collection:COLLECTION_NAME,
    timestamps:true
})
module.exports=mongoose.model(DOCUMENT_NAME,userSchema)