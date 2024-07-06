import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const getList=async (req,res)=>{
    try{
        const {page}= req.query;
        const {mediaType,mediaCategory}=req.params;

        const response = await tmdbApi.mediaList({mediaType,mediaCategory,page});

        return responseHandler.ok(res,response);
    }
    catch{
        return responseHandler.error(res);
    }
}

const getGenres=async (req,res)=>{
    try{
        const {mediaType}=req.params;
        const response=await tmdbApi.mediaGenres({mediaType})
        return responseHandler.ok(res,response);
    }
    catch{
        return responseHandler.error(res);
    }
}

const search=async (req,res)=>{
    try{
        const {query,page}=req.query;
        const {mediaType}=req.params;
        const response=await tmdbApi.mediaSearch({mediaType:mediaType==="people"?"person":mediaType,query,page});
        return responseHandler.ok(res,response);
    }
    catch{
        return responseHandler.error(res);
    }
}

const getDetail=async (req,res)=>{
    try{
        const params=req.params;
        const media=await tmdbApi.mediaDetail(params);
        media.credits=await tmdbApi.mediaCredits(params);
        media.videos=await tmdbApi.mediaVideos(params);
        media.recommand=await tmdbApi.mediaRecommendations(params).results;
        media.images=await tmdbApi.mediaImages(params);

        const tokenDecoded=tokenMiddleware.tokenDecode(req);
        if(tokenDecoded){
            const user= userModel.findById(tokenDecoded.data);
            if(user){
                const favorite=await favoriteModel.findOne({user:user.id,mediaId});
                if(favorite){
                    media.isFavorite=true;
                }
            }
        }
        media.reviews=await reviewModel.find({mediaId}).populate("user").sort("-createdAt");
        return responseHandler.ok(res,media);
    }
    catch{
        return responseHandler.error(res);
    }
}

export default {getList,getGenres,search,getDetail}