const mongoose=require(`mongoose`)
const DOCUMENT_NAME=`Role`
const COLLECTION_NAME=`Roles`

const rolesSchema=new mongoose.Schema({
    role_name:{type:String,default:`user`,enum:[`user`,`shop`,`admin`]},
    role_slug:{type:String,required:true},
    role_status:{type:String,default:`active`,enum:[`active`,`block`,`pending`]},
    role_description:{type:String,default:""},
    role_grants:[
        {
            resource:{type:mongoose.Schema.Types.ObjectId,ref:`Resource`,required:true},
            actions:[{type:String,require:true}],
            attributes:{type:String,default:"*"}

        }
    ]
},{
    collection:COLLECTION_NAME,
    timestamps:true
})
module.exports=mongoose.model(DOCUMENT_NAME,rolesSchema)
