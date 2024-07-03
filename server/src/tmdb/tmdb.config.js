const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_API_KEY;

const getUrl = (endpoints, params) => {
  const qs = new URLSearchParams(params);

  return `${baseUrl}${endpoints}?api_key=${key}&${qs}`;
};

export default { getUrl };
