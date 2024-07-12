import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

const addFavorite=async (req,res)=>{
    try{
        const {mediaId}=req.body;
        const isFavorite=await favoriteModel.findOne({user:req.user.id,mediaId});
        if(isFavorite){
            return responseHandler.ok(res,isFavorite);
        }
        const newFavorite=await favoriteModel.create({
            ...req.body,
            user:req.user.id
        });
        return responseHandler.created(res,newFavorite);
    }
    catch{
        return responseHandler.error(res);
    }
}

const removeFavorite=async (req,res)=>{
    try{
        const {favoriteId} = req.params;
        const favorite=await favoriteModel.findOne({user:req.user.id,_id:favoriteId});
        if(!favorite){
            return responseHandler.notfound(res);
        }
        await favoriteModel.deleteOne({ _id: favoriteId, user: req.user.id });
        return responseHandler.ok(res, { message: favorite });
    }
    catch{
        return responseHandler.error(res);
    }
}

const getFavoritesofUser=async (req,res)=>{
    try{
        const favorites=await favoriteModel.find({user:req.user.id}).sort("-createdAt");
        return responseHandler.ok(res,favorites);
    }
    catch{
        return responseHandler.error(res);
    }
}

export default{
    addFavorite,
    removeFavorite,
    getFavoritesofUser
};