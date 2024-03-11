`use strict`
const { AuthFailureError } = require("../core/error.response")
const rbacService = require("../services/rbac.service")
const rbac=require(`./role.middleware`)
/**
 * @param {string} action //read,delete or update
 * @param {*} resource //profile,balance.....
 * 
 */
const grantAccess=(action,resource)=>{
    return async (req,res,next)=>{
        try{
            rbac.setGrants(await rbacService.listRoles())
            const role_name=req.query.role
            const permission=rbac.can(role_name)[action](resource)
            
            if(!permission.granted){
                
                throw new AuthFailureError(`you dont have enough permission....`)
            }
            next()
        }catch(error){
            next(error) 
        }
    }
}
module.exports={grantAccess}