const { forIn } = require("lodash");
const cloudinary=require(`../configs/configs.cloudinary`);
const { BadRequestError } = require("../core/error.response");

class uploadService{
    static uploadImageFromLocal=async(imagePath)=>{
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            folder:"Ecommerce"  
        };
        const result=await cloudinary.uploader.upload(imagePath,options)
        if(result==null){
            throw new BadRequestError({
                message:`Error while upload image`
            })
        }
        return {result}
            
    }
    static uploadImageFromFiles=async(files)=>{
        const result=[]
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            folder:"Ecommerce"
        };
        for (let i = 0; i < files.length; i++) {
            const image=await cloudinary.uploader.upload(files[i].path,options)
            result.push(image)
        }
        if(result==null){
            throw new BadRequestError({
                message:`Error while upload image`
            })
        }
        return {result}
    }
}
module.exports=uploadService
