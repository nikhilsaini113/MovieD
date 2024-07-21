import React from "react";
import HeroSlide from "../components/common/HeroSlide";
import tmdbConfigs from "../api/configs/tmdb.configs";
import { Box } from "@mui/material";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";
import axios from "axios";
import { useState, useEffect } from "react";
import userApi from "../api/modules/user.api";
import SiginForm from "../components/common/SigninForm";
const HomePage = () => {
  const [userdata, setUserdata] = useState({});
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/login/sucess", {
        withCredentials: true,
      });
      console.log("hi", response);
      setUserdata(response.data.user);
      console.log(userdata);
    } catch (error) {
      //console.log(response);
      console.log("error", error);
    }
  };
  // const logout = () => {
  //   window.open("http://localhost:6005/logout", "_self");
  // };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
      <Box marginTop="-4rem" sx={uiConfigs.style.mainContent}>
        <Container header="Popular Movies">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          ></MediaSlide>
        </Container>
        <Container header="Popular Shows">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          ></MediaSlide>
        </Container>
        <Container header="Top Rated Movies">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          ></MediaSlide>
        </Container>
        <Container header="Top Rated Shows">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          ></MediaSlide>
        </Container>
      </Box>
    </div>
  );
};

export default HomePage;
