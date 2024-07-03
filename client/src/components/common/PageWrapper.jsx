import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

const PageWrapper = ({ state, children }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAppState(state));
  }, [state, dispatch]);
  return children;
};

export default PageWrapper;
