import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: [],
    watchlist: [],
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token)
          localStorage.setItem("actkn", action.payload.token);
      }
      state.user = action.payload;
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    removefromWatchlist: (state, action) => {
      const { mediaId } = action.payload;
      state.watchlist = [...state.watchlist].filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },
    addtoWatchlist: (state, action) => {
      state.watchlist = [action.payload, ...state.watchlist];
    },
  },
});

export const { setUser, setListFavorites, addFavorite, removeFavorite, setWatchlist, addtoWatchlist, removefromWatchlist } =
  userSlice.actions;

export default userSlice.reducer;
