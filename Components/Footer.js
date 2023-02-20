import { Box, Grid, Typography, IconButton, Button } from "@mui/material";
import React from "react";
import style from "../styles/Home.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <Box className={style.footer}>
      <div>
        <div className={style.gridItem} >
          <Typography variant="caption">Follow me :</Typography>
          <IconButton href="https://github.com/Deepak-11-03" target="_blank">
            <GitHubIcon />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/deepak-kumar-322685202/"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>
        </div>
        <div className={style.gridItem}>
          <Typography variant="subtitle1" color="lightgray">
            &#169; Deepak 
          </Typography>
        </div>
      </div>
    </Box>
  );
}

export default Footer;
