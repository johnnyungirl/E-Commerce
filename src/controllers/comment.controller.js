const { SuccessResponse } = require('../core/success.response')
const CommentService = require('../services/comment.service')

class CommentController{
    createComment=async (req,res,next)=>{
        new SuccessResponse({
            message:'Create comment success',
            metadata: await CommentService.createComment(req.body)
        }).send(res)
    }
    deleteComment=async(req,res,next)=>{
        new SuccessResponse({
            message:"Delete comment success",
            metadata:await CommentService.deleteComment(req.body)
        }).send(res)
    }
    listCommentByProductId=async(req,res,next)=>{
        new SuccessResponse({
            message:"List comments success",
            metadata: await CommentService.getCommentsByProductId(req.body)
        }).send(res)
    }
    
}
module.exports=new CommentController()