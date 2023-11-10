const { BadRequestError } = require("../core/error.response");
const keytokenModel = require("../models/keytoken.model");
const shopModel = require("../models/shop.model");
const { findByEmail } = require('./shop.service')
const bcrypt=require('bcrypt')

class PasswordService{
    
    static async changePassword({useremail,oldPassword,newPassword}){
        const findUser=await shopModel.findOne({email:useremail})
        const foundPassword=await bcrypt.compare(oldPassword,findUser.password)
        if(!foundPassword){
            throw new BadRequestError("Wrong password,try again!")
        }
        const newPasswordHash=await bcrypt.hash(newPassword,10)
        const query={email:useremail}
        const replace={password:newPasswordHash}
        const result=shopModel.findOneAndUpdate(query,replace,{ returnOriginal: false })
        if(!result){
            throw new BadRequestError("Change password fail")
        }
        return result
    }
    static async forgotPassword({useremail,refreshToken={}}){
        const foundShop=shopModel.findOne({email:useremail})
        if(!foundShop){
            throw new BadRequestError("Wrong Email, try again!")
        }
        const foundKeys=keytokenModel.findById({_id:foundShop._id})
        if(!foundKeys){
            throw new BadRequestError("ResfreshToken no found,try again")
        }
        if(!foundKeys.refreshToken==refreshToken){
            throw new BadRequestError("Wrong ResfreshToken,try again")
        }
        
        
    }
}
module.exports= PasswordService