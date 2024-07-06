import React from "react";
import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
const HomePage = () => {
  return <div>
    <HeroSlide mediaType={tmdbConfigs.mediaType.movie} mediaCategory={tmdbConfigs.mediaCategory.popular}/>
  </div>;
};

export default HomePage;
