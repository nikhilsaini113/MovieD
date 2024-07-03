const mediaType = {
  movie: "movie",
  tv: "tv",
};

const mediaCategory = {
  popular: "popular",
  top_rated: "top_rated",
};

const backdropPath = (imgEndPoint) =>
  `https://iamge.tmdb.org/t/p/orignal${imgEndPoint}`;

const posterPath = (imgEndPoint) =>
  `https://iamge.tmdb.org/t/p/w500${imgEndPoint}`;

const youtubePath = (videoId) =>
  `https://www.youtube.com/embed/${videoId}?controls=0`;

const tmdbconfigs = {
  mediaType,
  mediaCategory,
  backdropPath,
  posterPath,
  youtubePath,
};

export default tmdbconfigs;
