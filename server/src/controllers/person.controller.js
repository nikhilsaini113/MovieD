import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetail=async (req,res)=>{
    try{
        const {personId}=req.params;
        const person=await tmdbApi.personDetail({personId});
        return responseHandler.ok(res,person);
    }
    catch{
        return responseHandler.error(res);
    }
}

const personMedias=async (req,res)=>{  
    try{
        const {personId}=req.params;
        const media=await tmdbApi.personMedias({personId});
        return responseHandler.ok(res,media);
    }
    catch(error){
        console.log(error)
        return responseHandler.error(res);
    }
}

export default{
    personDetail,
    personMedias
}
    