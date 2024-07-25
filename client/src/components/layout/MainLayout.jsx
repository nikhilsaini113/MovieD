import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import AuthModal from "../common/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userApi from "../../api/modules/user.api";
import favoriteApi from "../../api/modules/favorite.api";
import watchlistApi from "../../api/modules/watchlist.api";
import {
  setWatchlist,
  setListFavorites,
  setUser,
} from "../../redux/features/userSlice";
import axios from "axios";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { themeMode } = useSelector((state) => state.themeMode);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();
      if (response) {
        dispatch(setUser(response));
        return;
      }
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/login/success`, {
        withCredentials: true,
      });
      if (res.data.user.id) dispatch(setUser(res.data.user));
    };
    authUser();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList();
      if (response) {
        dispatch(setListFavorites(response));
      }
      if (err) {
        toast.error(err.message);
      }
    };
    const getWatchlist = async () => {
      const { response, err } = await watchlistApi.getList();
      if (response) {
        dispatch(setWatchlist(response));
      }
      if (err) {
        toast.error(err.message);
      }
    };
    if (user) {
      getFavorites();
      getWatchlist();
    } else {
      dispatch(setListFavorites([]));
      dispatch(setWatchlist([]));
    }
  }, [dispatch, user]);
  return (
    <>
      {/* global loading */}
      <GlobalLoading />
      {/* global loading */}

      {/* login modal */}
      <AuthModal></AuthModal>
      {/* login modal */}

      <Box display="flex" minHeight="100vh">
        {/* header */}
        <TopBar></TopBar>
        {/* header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      <Footer></Footer>
      {/* footer */}
    </>
  );
};

export default MainLayout;
