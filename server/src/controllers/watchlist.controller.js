import responseHandler from "../handlers/response.handler.js";
import watchlistModel from "../models/watchlist.model.js";

const addtoWatchlist=async (req,res)=>{
    try{
        const {mediaId}=req.body;
        const inWatchlist=await watchlistModel.findOne({user:req.user.id,mediaId});
        if(inWatchlist){
            return responseHandler.ok(res,inWatchlist);
        }
        const newWatchlist=await watchlistModel.create({
            ...req.body,
            user:req.user.id
        });
        return responseHandler.created(res,newWatchlist);
    }
    catch{
        return responseHandler.error(res);
    }
}

const removefromWatchlist=async (req,res)=>{
    try{
        const {watchlistId} = req.params;
        const watchlist=await watchlistModel.findOne({user:req.user.id,_id:watchlistId});
        if(!watchlist){
            return responseHandler.notfound(res);
        }
        await watchlistModel.deleteOne({ _id: watchlistId, user: req.user.id });
        return responseHandler.ok(res, { message: watchlist });
    }
    catch{
        return responseHandler.error(res);
    }
}

const getWatchlistofUser=async (req,res)=>{
    try{
        const watchlist=await watchlistModel.find({user:req.user.id}).sort("-createdAt");
        return responseHandler.ok(res,watchlist);
    }
    catch{
        return responseHandler.error(res);
    }
}

export default{
    addtoWatchlist,
    removefromWatchlist,
    getWatchlistofUser
};