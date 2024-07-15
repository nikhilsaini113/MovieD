import privateClient from "../client/private-client";
const watchlistEndpoints = {
  list: "user/watchlist",
  add: "user/watchlist",
  remove: ({ watchlistId }) => `user/watchlist/${watchlistId}`,
};

const watchlistApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(watchlistEndpoints.list);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
    try {
      const response = await privateClient.post(watchlistEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  remove: async ({ watchlistId }) => {
    try {
      const response = await privateClient.delete(
        watchlistEndpoints.remove({ watchlistId })
      );

      return { response };
    } catch (err) {
      console.log(err);
      return { err };
    }
  },
};

export default watchlistApi;
