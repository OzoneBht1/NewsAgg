import React from "react";
import { Box } from "@mui/material";
import FeedCard from "./FeedCard";

const Feed = () => {
  return (
    <Box p={2} width="80%">
      <Box display="flex" flexWrap="wrap" justifyContent="align-left">
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </Box>
    </Box>
  );
};

export default Feed;
