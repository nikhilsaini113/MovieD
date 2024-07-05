import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../common/GlobalLoading";
import Footer from "../common/Footer";
import TopBar from "../common/TopBar";
import AuthModal from "../common/AuthModal";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import userApi from "../../api/modules/user.api";
import favoriteApi from "../../api/modules/favorite.api";
import { setListFavorites,setUser } from "../../redux/features/userSlice";
import { setThemeMode } from "../../redux/features/themeModeSlice";


const MainLayout = () => {
  const dispatch=useDispatch();
  const {user} = useSelector((state)=>state.user);
  const { themeMode } = useSelector((state) => state.themeMode);
  
  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();
      if (response) {
        dispatch(setUser(response));
      }
      if (err) dispatch(setUser(null));
    }
    authUser();
  },[dispatch])

  useEffect(() => {
    localStorage.setItem("themeMode",themeMode);
  },[themeMode])

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList();
      if (response) {
        dispatch(setListFavorites(response));
      }
      if (err) {
        toast.error(err.message);
      }
    }
    if(user){
      getFavorites();
    }
    else{
      dispatch(setListFavorites([]));
    }
  },[dispatch,user])
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
