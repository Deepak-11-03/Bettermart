import { Box,Typography, IconButton } from "@mui/material";
import React from "react";
import style from "../styles/Home.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import Link from "next/link";

const infoPages =["about-us","contact-us","privacy-policy"];

function Footer() {

  return (
    <Box className={style.footer}>
      <div>
        <div className={style.gridItem} >
          <Typography variant="caption">Follow on:</Typography>
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
      <div className={style.footerLink}>
        {["About Us","Contact Us","Privacy Policy" ].map((page,index)=>(
          <Link  key={page} href={`/${infoPages[index]}`}>{page}</Link>
        ))}
      </div>
      <div>
        <Image
                  src="/logo.png"
                  alt="websitename"
                  width={150}
                  height={62}
                />
                <Typography variant="subtitle2" textAlign="center" >Shop everything here</Typography>
        </div>
    </Box>
  );
}

export default Footer;
