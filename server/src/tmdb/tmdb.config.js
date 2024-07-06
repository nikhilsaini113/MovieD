const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_API_KEY;

const getUrl = (endpoints, params) => {
  const qs = new URLSearchParams(params);
  const url=`${baseUrl}${endpoints}?api_key=${key}&${qs}`;
  return url;
};

export default { getUrl };
