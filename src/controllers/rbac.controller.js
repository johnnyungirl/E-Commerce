const { SuccessResponse, CREATED } = require("../core/success.response")
const rbacService = require("../services/rbac.service")
const { createResource, createRole, resourceList } = require("../services/rbac.service")
require(`../services/rbac.service`)

class rbacController{
    newRole=async(req,res,next)=>{
        new CREATED({
            message:`create role success`,
            metadata:await rbacService.createRole(req.body)
        }).send(res)
    }
    newResource=async(req,res,next)=>{
        new CREATED({
            message:`create resource success`,
            metadata:await rbacService.createResource(req.body)
        }).send(res)
    }
    listResource=async(req,res,next)=>{
        new SuccessResponse({
            message:`list resource success`,
            metadata:await rbacService.resourceList(req.query)
        }).send(res)
    }
    listRoles=async(req,res,next)=>{
        new SuccessResponse({
            message:`list roles success`,
            metadata:await rbacService.listRoles()
        }).send(res)
    }
}
module.exports=new rbacController()