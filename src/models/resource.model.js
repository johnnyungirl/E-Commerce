`use strict`
const mongoose=require(`mongoose`)
const DOCUMENT_NAME=`Resource`
const COLLECTION_NAME=`Resources`

const resourceSchema=new mongoose.Schema({
    src_name:{type:String,required:true},
    src_slug:{type:String,required:true},
    src_description:{type:String,default:""}
},{ 
    collection:COLLECTION_NAME,
    timestamps:true
})
module.exports=mongoose.model(DOCUMENT_NAME,resourceSchema)
