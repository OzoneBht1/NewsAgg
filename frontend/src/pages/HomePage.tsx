import { Box, Stack } from "@mui/system";
import React from "react";
import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";

const HomePage = () => {
  return (
    <Box>
      <Navbar />
      <Stack direction="row" spacing={2}>
        <Sidebar />
        <Feed />
      </Stack>
    </Box>
  );
};

export default HomePage;
