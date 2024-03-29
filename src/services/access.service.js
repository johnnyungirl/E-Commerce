'use strict'
const JWT=require(`jsonwebtoken`)
const shopModel=require('../models/shop.model')
const bcrypt=require('bcrypt')
const crypto=require('crypto')
const KeytokenService = require('./keyToken.service')
const {createTokenPair, verifyJWT}=require('../auth/authUtils')
const { getInfoData } = require('../utils')
const { BadRequestError,ConflictRequestError, AuthFailureError, ForbiddenError, NotFoundError, InternalServerError} = require('../core/error.response')
const { findByEmail } = require('./shop.service')
const keytokenModel = require('../models/keytoken.model')
const RoleShop={
    SHOP:`SHOP`,
    WRITER:`WRITER`,
    EDITOR:`EDITOR`,
    ADMIN:`ADMIN`
}
class AccessService{
    static handleRefreshTokenV2=async ({keyStore,user,refreshToken})=>{
        const {userId,email}=user
        if(keyStore.refreshTokensUsed.includes(refreshToken)){
            await KeytokenService.deleteKeyById(userId)
            throw new ForbiddenError("Something Wrong, Please relogin!")
        }
        if(keyStore.refreshToken!==refreshToken) throw new AuthFailureError("Shop not registered")
        
        const foundShop=await findByEmail({email})
        if(!foundShop) throw new AuthFailureError('Shop not registered')
        const newTokens=await createTokenPair({userId,email},keyStore.publicKey,keyStore.privateKey)
        await keyStore.updateOne({
            $set:{
                refreshToken:newTokens.refreshToken
            },
            $addToSet:{
                refreshTokensUsed:refreshToken
            }
        })
        return {
            user,
            newTokens            
        }
    }
    static handleRefreshToken=async (refreshToken)=>{
        //check Tokens is used ?
       const foundToken=await KeytokenService.findByRefreshTokenUsed(refreshToken)
        if(foundToken){
            const {userId,email}= await verifyJWT(refreshToken,foundToken.privateKey)
            console.log({userId,email})
            await KeytokenService.deleteKeyById(userId)
            throw new ForbiddenError("Something Wrong, Please relogin!")
            
        }
        const holderToken= await KeytokenService.findByRefreshToken(refreshToken)
        if(!holderToken) throw new AuthFailureError('Shop not registered')
        const {userId,email}=await verifyJWT(refreshToken,holderToken.privateKey)
        const foundShop=await findByEmail({email})
        if (!foundShop) throw new AuthFailureError('Shop not registered')
        const newTokens=await createTokenPair({userId,email},holderToken.publicKey,holderToken.privateKey)
        await holderToken.updateOne({
            $set:{
                refreshToken:newTokens.refreshToken
            },
            $addToSet:{
                refreshTokensUsed:refreshToken
            }
        })
        return {
            user:{userId,email},
            newTokens            
        }
    }
    //LogOut
    /**
     * 
     * @param {Headers} keyStore 
     * @returns 
     */
    static logOut= async(keyStore)=>{
        const delKey=KeytokenService.removeKeyById(keyStore._id)
        console.log({delKey})
        return delKey
    }
    //logIn
    //1.-check email in dbs
    //2.-match password
    //3.-create AT vs RT and save
    //4.-generate tokens
    //5.-get data return login
    
    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @returns {object} shop,tokens
     */
    static logIn=async({email,password,refreshToken=null})=>{
        //1
        const foundshop= await findByEmail({email})
        if(!foundshop){
            throw new BadRequestError("Shop not registered")
        }
        //2
        const match=await bcrypt.compare(password,foundshop.password)
        if(!match) throw new AuthFailureError("Authorization error")
        //3
        
        return {
            shop: getInfoData({fields:['_id','name','email'],object:foundshop}),
        }
    }
    //signUp
        /**
         * 
         * @param {string} name
         * @param {string} email
         * @param {string} password
         * @returns {message,status}
         */
    static signUp=async ({name,email,password})=>{
            //check if account exists
            const holderShop=await shopModel.findOne({email}).lean()
            if (holderShop){
                throw new BadRequestError('Error: Shop already registered!')
            }
            //create if shop not exists yet
            //hash password before add to DB
            const passwordHash=await bcrypt.hash(password,10)
            const newShop=await shopModel.create({
                name,email,password:passwordHash,roles:[RoleShop.SHOP]
            })
            //create accessToken and refreshToken for Shop
            if(newShop){
                //created privateKey,publicKey
                const {privateKey,publicKey}=crypto.generateKeyPairSync('rsa',{
                    modulusLength:4096,
                    publicKeyEncoding:{
                        type:'pkcs1',
                        format:'pem'
                    },
                    privateKeyEncoding:{
                        type:'pkcs1',
                        format:'pem'
                    },
                })
                const publicKeyObject=crypto.createPublicKey(publicKey)
                //create token pair
                const tokens=await createTokenPair({userId:newShop._id,email},publicKeyObject,privateKey)
                
                await KeytokenService.createtoken({userId:newShop._id,publicKey:publicKey,privateKey:privateKey,refreshToken:tokens.refreshToken})
                return{
                    shop:getInfoData({fields:['_id','name','email'],object:newShop}),
                    tokens
                }
            }
        }
    
}


module.exports=AccessService