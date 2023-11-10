const commentModel = require('../models/comment.model')
const { convertToObjectIdMongodb } = require('../utils')
function createComment({userId,productId,content,parentId=null}){
    const comment =new commentModel({
        comment_productId:convertToObjectIdMongodb(productId),
        comment_content:content,
        comment_parentId:parentId,
        comment_userId:userId
    })
    let rightValue
    const commentParent=commentModel.findById(productId)
    if(commentParent){
        rightValue=commentParent.comment_right
        comment.comment_left=rightValue
        comment.comment_right=rightValue+1
        await commentModel.updateMany({
            
        })
        
    }
}