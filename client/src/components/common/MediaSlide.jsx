import { useEffect,useState } from "react"
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem"

const MediaSlide = ({mediaType,mediaCategory}) => {
    const [medias,useMedias]=useState([]);
    useEffect(()=>{
      const getMedias=async()=>{
        const {response,err}=await mediaApi.getList({mediaType,mediaCategory,page:1});
        if(response){
          useMedias(response.results);
        }
        if(err){
            toast.error(err.message);
        }
      }
      getMedias();
    },[mediaType,mediaCategory])
  return (
    <AutoSwiper>
        {medias.map((media,index)=>(
            <SwiperSlide key={index}>
                <MediaItem media={media} mediaType={mediaType}>
                
                </MediaItem>
            </SwiperSlide>
        ))}
    </AutoSwiper>
  )
}

export default MediaSlide