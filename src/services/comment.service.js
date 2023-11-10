// const { BadRequestError, NotFoundError } = require('../core/error.response')
// const commentModel = require('../models/comment.model')
// const { findProducts } = require('../models/repositories/product.repo')
// const { convertToObjectIdMongodb } = require('../utils/index')
// class CommentService{
//     static async createComment({
//         productId,userId,content,parentCommentId=null
//     }){
//         const comment=new commentModel({
//             comment_productId:productId,
//             comment_userId:userId,
//             comment_content:content,
//             comment_parentId:parentCommentId
//         })
//         let rightValue
//         if(parentCommentId){
//             const parentComment=await commentModel.findById({comment_parentId:parentCommentId})
//             if(!parentComment) throw new BadRequestError('parent comment not found')
//             rightValue=parentComment.comment_right
//             await commentModel.updateMany({
//                 comment_productId:convertToObjectIdMongodb(productId),
//                 comment_right:{$gte:rightValue}
//             },{$inc:{comment_right:2}})
//             await commentModel.updateMany({
//                 comment_productId:convertToObjectIdMongodb(productId),
//                 comment_left:{$gt:rightValue}
//             },{$inc:{comment_left:2}})
//         }else{
//             const maxrightValue=commentModel.findOne({
//                 comment_productId:convertToObjectIdMongodb(productId),
//             },'comment_right',{sort:{comment_right:-1}})
//             if(maxrightValue){
//                 rightValue=maxrightValue.right+1
//             }else{
//                 maxrightValue=1
//             }
//         }
//         await comment.save()
//         return comment
//     }
//     static async getCommentByParentId({
//         productId,
//         parentCommentId=null,
//         limit=50,
//         offset=0
//     }){
//         if(parentCommentId){
//             const parentComment=commentModel.findOne(parentCommentId)
//             if(!parentComment) throw new BadRequestError('Not found comment for product')
//             const comments=await commentModel.find({
//                 comment_productId:convertToObjectIdMongodb(productId),
//                 comment_parentId:convertToObjectIdMongodb(parentCommentId),
//                 comment_left: {$gt:parentComment.comment_left},
//                 comment_right:{$gte:parentComment.comment_right}
//             }).select({
//                 comment_left:1,
//                 comment_right:1,
//                 comment_content:1,
//                 comment_parentId:1
//             }).sort({
//                 comment_left:1
//             })
//             return comments
//         }
//     }
//     static async deleteComment({commentId,productId}){
//         const foundProduct=await findProducts({
//             product_id:productId
//         })
//         if (!foundProduct) throw new NotFoundError('product not found ')
//         //1. xac dinh left right
//         const comment=await commentModel.findById(commentId)
//         if (!comment) throw new NotFoundError('comment not found ')
//         const leftValue=comment.comment_left
//         const rightValue=comment.comment_right
//         //2. tim width
//         const width=rightValue-leftValue+1
//         //3. delete comment
//         await commentModel.deleteMany({
//             comment_productId:convertToObjectIdMongodb(productId),
//             comment_left:{$gte:leftValue,$lte:rightValue}
//         })
//         //4.tinh lai cac gia tri left right con lai 
//         await commentModel.updateMany({
//             comment_productId:convertToObjectIdMongodb(productId),
//             comment_right:{$gte:rightValue},
            
//         },{
//             $inc:{comment_right:-width}
//         })
//         await commentModel.updateMany({
//             comment_productId:convertToObjectIdMongodb(productId),
//             comment_left:{$gt:rightValue},

//         },{
//             $inc:{comment_left:-width}
//         })
//         return true
//     }
// }
// module.exports=CommentService
const { BadRequestError } = require("../core/error.response");
const commentModel = require("../models/comment.model");
const { findProducts } = require("../models/repositories/product.repo");
const { convertToObjectIdMongodb } = require("../utils/index");
class CommentService{
    static async createComment({userId,productId,content,parentId=null}){
        console.log(parentId)
        console.log(typeof parentId)
        const comment =new commentModel({
            comment_productId:convertToObjectIdMongodb(productId),
            comment_content:content,
            comment_parentId:parentId,
            comment_userId:userId
        })
        
        let rightValue
        if(parentId){
            const parentComment=await commentModel.findById({_id:parentId})
            if(!parentComment) throw new BadRequestError(`parent comment no found`)
            rightValue=parentComment.comment_right
            await commentModel.updateMany({
                comment_productId:convertToObjectIdMongodb(productId),
                comment_right:{$gte:rightValue}

            },{$inc:{comment_right:2}})
            await commentModel.updateMany({
                comment_productId:convertToObjectIdMongodb(productId),
                comment_left:{$gt:rightValue}
            },{$inc:{comment_left:2}})
        }else{
            const maxRightValue=await commentModel.findOne({
                comment_productId:convertToObjectIdMongodb(productId),
            }).sort({comment_right:-1})

            if(maxRightValue){
                rightValue=maxRightValue.comment_right+1

            }else{
                rightValue=1
            }
        }
        comment.comment_left=rightValue
        comment.comment_right=rightValue+1
        comment.save()
        return comment
    }
    static async deleteComment({productId,commentId}){
        console.log(convertToObjectIdMongodb(commentId))
        console.log(productId)
        const foundComment=await commentModel.findById({_id:convertToObjectIdMongodb(commentId)})
        if(!foundComment) throw new BadRequestError(`comment no found`)
        let rightValue=foundComment.comment_right
        let leftValue=foundComment.comment_left
        const width=rightValue-leftValue+1
        await commentModel.deleteMany({
            comment_productId:convertToObjectIdMongodb(productId),
            comment_right:{$lte:rightValue},
            comment_left:{$gte:leftValue}
        })
        await commentModel.updateMany({
            comment_productId:convertToObjectIdMongodb(productId),
            comment_right:{$gt:rightValue}
        },{$inc:{comment_right:-width}})     
        await commentModel.updateMany({
            comment_productId:convertToObjectIdMongodb(productId),
            comment_left:{$gt:rightValue}
        },{$inc:{comment_left:-width}})   
    }
    static async getCommentsByProductId({productId}){
        const foundProduct= findProducts({product_id:productId})
        if(!foundProduct) throw new BadRequestError("Product no found")
        const results=await commentModel.find({comment_productId:convertToObjectIdMongodb(productId)})
        return results
    }
}
module.exports=CommentService