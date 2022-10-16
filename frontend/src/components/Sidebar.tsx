import React from "react";
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

const StyledImg = styled("img")({
  width: "30px",
  height: "30px",
});
const Sidebar = () => {
  return (
    <Box
      borderRight={1}
      width="18%"
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box sx={{ position: "fixed" }}>
        <List>
          <ListItem>
            <Typography variant="h6">News Source</Typography>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <StyledImg src={ekantipur} alt="ekantipur"></StyledImg>
              </ListItemIcon>
              <ListItemText primary="Ekantipur" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#">
              <ListItemIcon>
                <StyledImg src={onlinekhabar} alt="OnlineKhabar"></StyledImg>
              </ListItemIcon>
              <ListItemText primary="OnlineKhabar" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
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
