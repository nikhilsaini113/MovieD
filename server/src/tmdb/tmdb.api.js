import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoints.js";

const tmdbApi={
    mediaList:async({mediaType,mediaCategory,page})=>
        await axiosClient.get(tmdbEndpoints.mediaList({mediaType,mediaCategory,page})),
    mediaDetails:async({mediaType,mediaId})=>
        await axiosClient.get(tmdbEndpoints.mediaDetails({mediaType,mediaId})),
    mediaVideos:async({mediaType,mediaId})=>
        await axiosClient.get(tmdbEndpoints.mediaVideos({mediaType,mediaId})),
    mediaGenres:async({mediaType})=>
        await axiosClient.get(tmdbEndpoints.mediaGenres({mediaType})),
    mediaCredits:async({mediaType,mediaId})=>
        await axiosClient.get(tmdbEndpoints.mediaCredits({mediaType,mediaId})),
    mediaImages:async({mediaType,mediaId})=>
        await axiosClient.get(tmdbEndpoints.mediaImages({mediaType,mediaId})),
    mediaRecommend:async({mediaType,mediaId})=>
        await axiosClient.get(tmdbEndpoints.mediaRecommand({mediaType,mediaId})),
    mediaSearch:async({mediaType,query})=> 
        await axiosClient.get(tmdbEndpoints.mediaSearch({mediaType,query})),
    personDetail:async({personId})=>
        await axiosClient.get(tmdbEndpoints.personDetails({personId})),
    personMedias:async({personId})=>
        await axiosClient.get(tmdbEndpoints.personMedias({personId}))
}
export default tmdbApi