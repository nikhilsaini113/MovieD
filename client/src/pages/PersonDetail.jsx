import React from "react";
import { Box, Toolbar, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonMediaGrid from "../components/common/PersonMediaGrid";
import tmdbConfigs from "../api/configs/tmdb.configs";
import uiConfigs from "../configs/ui.configs";
import Container from "../components/common/Container";
import personApi from "../api/modules/person.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

const PersonDetail = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await personApi.detail({ personId });
      dispatch(setGlobalLoading(false));

      if (err) toast.error(err.message);
      if (response) setPerson(response);
    };

    getPerson();
  }, [personId]);

  return (
    <>
      <div>Hello</div>
    </>
  );
};

export default PersonDetail;
