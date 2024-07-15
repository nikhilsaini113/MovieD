import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import CircularRate from "../components/common/CircularRate";
import Container from "../components/common/Container";
import ImageHeader from "../components/common/ImageHeader";

import uiConfigs from "../configs/ui.configs";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import favoriteApi from "../api/modules/favorite.api";
import watchlistApi from "../api/modules/watchlist.api";

import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { addFavorite, removeFavorite ,addtoWatchlist,removefromWatchlist} from "../redux/features/userSlice";
import CastSlide from "../components/common/CastSlide";
import MediaVideosSlide from "../components/common/MediaVideosSlice";
import PosterSlide from "../components/common/PosterSlide";
import BackdropSlide from "../components/common/BackdropSlide";
import MediaSlide from "../components/common/MediaSlide";
import RecommendSlide from "../components/common/RecommendSlide";
import MediaReview from "../components/common/MediaReview";

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();

  const { user, listFavorites ,watchlist} = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [onRequestFavorite, setOnRequestFavorite] = useState(false);
  const [onRequestWatchlist, setOnRequestWatchlist] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setInWatchlist(response.inWatchlist);
        setGenres(response.genres.splice(0, 2));
      }

      if (err) toast.error(err.message);
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);
  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequestFavorite) return;
    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequestFavorite(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };

    const { response, err } = await favoriteApi.add(body);

    setOnRequestFavorite(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success("Add favorite success");
    }
  };

  const onWatchlistClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequestWatchlist) return;
    if (inWatchlist) {
      onRemovefromWatchlist();
      return;
    }

    setOnRequestWatchlist(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };

    const { response, err } = await watchlistApi.add(body);

    setOnRequestWatchlist(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(addtoWatchlist(response));
      setInWatchlist(true);
      toast.success("Added to watchlist");
    }
  };
  const onRemoveFavorite = async () => {
    if (onRequestFavorite) return;
    setOnRequestFavorite(true);

    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media.id.toString()
    );
    const { response, err } = await favoriteApi.remove({
      favoriteId: favorite.id,
    });

    setOnRequestFavorite(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success("Remove favorite success");
    }
  };

  const onRemovefromWatchlist = async () => {
    if (onRequestWatchlist) return;
    setOnRequestWatchlist(true);
    const watch = watchlist.find(
      (e) => e.mediaId.toString() === media.id.toString()
    );
    const { response, err } = await watchlistApi.remove({
      watchlistId: watch.id,
    });

    setOnRequestWatchlist(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(removefromWatchlist(watch));
      setInWatchlist(false);
      toast.success("Removed from watchlist");
    }
  };
  return media ? (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path
        )}
      />
      {/* media content */}
      <Box
        sx={{
          marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
          }}
        >
          {/* poster */}
          <Box
            sx={{
              width: { xs: "70%", sm: "50%", md: "40%" },
              margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
            }}
          >
            <Box
              sx={{
                paddingTop: "140%",
                ...uiConfigs.style.backgroundImage(
                  tmdbConfigs.posterPath(
                    media.poster_path || media.backdrop_path
                  )
                ),
              }}
            />
          </Box>
          {/* poster */}

          {/* media info */}
          <Box
            sx={{
              width: { xs: "100%", md: "60%" },
              color: "text.primary",
            }}
          >
            <Stack spacing={5}>
              {/* title */}
              <Typography
                variant="h4"
                fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                fontWeight="700"
                sx={{ ...uiConfigs.style.typoLines(2, "left") }}
              >
                {`${media.title || media.name} ${
                  mediaType === tmdbConfigs.mediaType.movie
                    ? media.release_date.split("-")[0]
                    : media.first_air_date.split("-")[0]
                }`}
              </Typography>
              {/* title */}

              {/* rate and genres */}
              <Stack direction="row" spacing={1} alignItems="center">
                {/* rate */}
                <CircularRate value={media.vote_average} />
                {/* rate */}
                <Divider orientation="vertical" />
                {/* genres */}
                {genres.map((genre, index) => (
                  <Chip
                    label={genre.name}
                    variant="filled"
                    color="primary"
                    key={index}
                  />
                ))}
                {/* genres */}
              </Stack>
              {/* rate and genres */}

              {/* overview */}
              <Typography
                variant="body1"
                sx={{ ...uiConfigs.style.typoLines(5) }}
              >
                {media.overview}
              </Typography>
              {/* overview */}

              {/* buttons */}
              <Stack direction="row" spacing={1}>
                <LoadingButton
                  variant="text"
                  sx={{
                    width: "max-content",
                    "& .MuiButon-starIcon": { marginRight: "0" },
                  }}
                  size="large"
                  startIcon={
                    isFavorite ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )
                  }
                  loadingPosition="start"
                  loading={onRequestFavorite}
                  onClick={onFavoriteClick}
                />
                <LoadingButton
                  variant="text"
                  sx={{
                    width: "max-content",
                    "& .MuiButon-starIcon": { marginRight: "0" },
                  }}
                  size="large"
                  startIcon={
                    inWatchlist ? (
                      <CheckBoxIcon />
                    ) : (
                      <AddBoxOutlinedIcon />
                    )
                  }
                  loadingPosition="start"
                  loading={onRequestWatchlist}
                  onClick={onWatchlistClick}
                />
                <Button
                  variant="contained"
                  sx={{ width: "max-content" }}
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => videoRef.current.scrollIntoView()}
                >
                  watch now
                </Button>
              </Stack>
              {/* buttons */}

              {/* cast */}
              <Container header="Cast">
                <CastSlide casts={media.credits.cast} />
              </Container>
              {/* cast */}
            </Stack>
          </Box>
          {/* media info */}
        </Box>
      </Box>
      {/* media content */}
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* media videos */}
        <div ref={videoRef} style={{ paddingTop: "2rem" }}>
          <Container header="Videos">
            <MediaVideosSlide videos={[...media.videos.results].splice(0, 5)} />
          </Container>
        </div>
        {/* media videos */}

        {/* media backdrop */}
        {media.images.backdrops.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={media.images.backdrops} />
          </Container>
        )}
        {/* media backdrop */}

        {/* media posters */}
        {media.images.posters.length > 0 && (
          <Container header="posters">
            <PosterSlide posters={media.images.posters} />
          </Container>
        )}
        {/* media posters */}

        {/* media reviews */}
        <MediaReview reviews={media.reviews} mediaType={mediaType} media={media}/>
        {/* media reviews */}

        {/* media recommendation */}
        <Container header="you may also like">
          {media.recommend.length > 0 && (
            <RecommendSlide medias={media.recommend} mediaType={mediaType} />
          )}
          {media.recommend.length === 0 && (
            <MediaSlide
              mediaType={mediaType}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          )}
        </Container>
        {/* media recommendation */}
      </Box>
    </>
  ) : null;
};
export default MediaDetail;
