import { useEffect, useState } from "react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";
import { SwiperSlide } from "swiper/react";
import NavigationSwiper2 from "./NavigationSwiper2";
const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);
  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      if (response) {
        console.log(response.results);
        setMedias(response.results);
      }
      if (err) {
        toast.error(err.message);
      }
    };
    getMedias();
  }, [mediaType, mediaCategory]);
  return (
    <NavigationSwiper2>
      {medias &&
        medias.map((media, index) => (
          <SwiperSlide key={index}>
            <MediaItem media={media} mediaType={mediaType} />
          </SwiperSlide>
        ))}
    </NavigationSwiper2>
  );
};

export default MediaSlide;
