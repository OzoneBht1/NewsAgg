import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import { ModeNight } from "@mui/icons-material";

import ekantipur from "./images/ekantipur.png";
import nagarik from "./images/nagarik.png";
import onlinekhabar from "./images/onlinekhabar.png";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledImg = styled("img")({
  width: "30px",
  height: "30px",
});
const Sidebar = () => {
  const [source, setSource] = useState("Ekantipur");
  const navigate = useNavigate();

  const ekantipurClickHandler = () => {
    setSource("ekantipur");
  };
  const onlinekhabarClickHandler = () => {
    setSource("onlinekhabar");
  };
  const nagarikClickHandler = () => {
    setSource("nagarik");
  };

  useEffect(() => {
    navigate(`/home/${source}`);
  }, [source, navigate]);

  return (
    <Box
      borderRight={1}
      width="25%"
      p={2}
      maxWidth="250px"
      minWidth="190px"
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box display="flex" position="fixed">
        <List sx={{ position: "relative" }}>
          <ListItem>
            <Typography variant="h6">News Source</Typography>
          </ListItem>
          <ListItem disablePadding onClick={ekantipurClickHandler}>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <StyledImg src={ekantipur} alt="ekantipur"></StyledImg>
              </ListItemIcon>
              <ListItemText primary="Ekantipur" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={onlinekhabarClickHandler}>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <StyledImg src={onlinekhabar} alt="OnlineKhabar"></StyledImg>
              </ListItemIcon>
              <ListItemText primary="OnlineKhabar" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={nagarikClickHandler}>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <StyledImg src={nagarik} alt="nagarik"></StyledImg>
              </ListItemIcon>
              <ListItemText primary="Nagarik News" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ marginTop: "60px" }}>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch></Switch>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
