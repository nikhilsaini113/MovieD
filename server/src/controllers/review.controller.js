import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

const create= async (req,res)=>{
    try{
        const {mediaId}=req.params;
        const review=await reviewModel.create({
            user:req.user.id,
            mediaId,
            ...req.body
        });
        return responseHandler.created(res,{
            ...review._doc,
            id:review.id,
            user:req.user
    });
    }
    catch{
        return responseHandler.error(res);
    }
}

const remove = async (req,res)=>{
    try{
        const {reviewId}=req.params;
        const review=await reviewModel.findOne({user:req.user.id,_id:reviewId});
        if(!review){
            return responseHandler.notfound(res);
        }
        await reviewModel.deleteOne({ _id: reviewId, user: req.user.id });
        return responseHandler.ok(res,review);
    }
    catch{
        return responseHandler.error(res);
    }
}

const getReviewsofUser=async (req,res)=>{
    try{
        const reviews=await reviewModel.find({user:req.user.id}).sort("-createdAt");
        return responseHandler.ok(res,reviews);
    }
    catch{
        return responseHandler.error(res);
    }
}

export default {
    create,
    remove,
    getReviewsofUser,
}