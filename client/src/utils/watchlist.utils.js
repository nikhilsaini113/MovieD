const watchlistUtils = {
    check: ({ watchlist, mediaId }) => watchlist && watchlist.find(e => e.mediaId.toString() === mediaId.toString()) !== undefined
  };
  
  export default watchlistUtils;