'use strict'
const { BadRequestError } = require("../core/error.response")
const resourceModel = require("../models/resource.model")
const rolesModel = require("../models/roles.model")
class rbacService{
    /**
     * new resource
     * @param {string} name
     * @param {string} slug
     * @param {string} description
     */
    static createResource=async({name=`profile`,slug=`p00001`,description=``})=>{
        //1. Check name or slug exists
        const foundResource=await resourceModel.findOne({src_name:name})
        if(foundResource){
            throw new BadRequestError(`Resource already exists`)
        }
        //2. new resource
        const newResource=await resourceModel.create({
            src_name:name,
            src_slug:slug,
            src_description:description
        })
        return newResource
    }

    static resourceList=async({userId,limit=30,offset=0,search=''})=>{
        try{
            //1.check admin ? middleware function
            //2. get list of resource
            const resource=await resourceModel.aggregate([
                {
                    $project:{
                    _id:0,
                    name:`$src_name`,
                    slug:`$src_slug`,
                    description:`$src_description`,
                    resourceId:`$_id`,
                    createAt:1
                }
            }
            ])
            return resource
        }catch(error){
            return []
        }
    }
    static createRole=async({name=`shop`,slug=`s00001`,description=`extend from shop or user`,grants=[]})=>{
        //1. check role exists
        const foundRole=await rolesModel.findOne({role_name:name})
        if(foundRole) throw new BadRequestError(`Role already exists`)
        //2.create role
        const newRole=await rolesModel.create({
            role_name:name,
            role_slug:slug,
            role_description:description,
            role_grants:grants
        })
        return newRole
    }
    static listRoles=async()=>{
        // return await rolesModel.find()
        return await rolesModel.aggregate([
            {
                $unwind:`$role_grants`
            },
            {
                $lookup:{
                    from:`Resources`,
                    localField:`role_grants.resource`,
                    foreignField:`_id`,
                    as:`resource`
                }
            },
            {
                $unwind:`$resource`
            },
            {
                $project:{
                    _id:0,
                    role:`$role_name`,
                    action:`$role_grants.actions`,
                    resource:`$resource.src_name`,
                    attribute:`$role_grants.attributes`
                }
            },
            {
                $unwind:`$action`
            }
        ])
    }
}
module.exports=rbacService