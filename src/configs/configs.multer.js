require(`dotenv`).config()
const multer=require(`multer`)

const diskStorage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,process.env.UPLOADS_IMAGE_FILE)
    },
    filename:(req,file,callback)=>{
        
        callback(null,file.originalname)
    }
    
})
const upload=multer({
    storage:diskStorage
})
module.exports=upload