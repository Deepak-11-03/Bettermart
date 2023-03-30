import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";


const infoPages =["privacy-policy","contact-us","about-us"];


export default function Sidebar({ drawer, setDrawer }) {
  const router = useRouter();
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(!drawer);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      // role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List sx={{ textAlign: "center" }}>
        <Image src="/logo.png" alt="websitename" width={110} height={48} />
        <br />
        <br />
        <Typography variant="subtitle1" color="initial">
          All Category
        </Typography>
        <Divider />
        {[
          "smartphones",
          "laptops",
          "fragrances",
          "skincare",
          "groceries",
          "home-decoration",
          "furniture",
          "tops",
          "womens-dresses",
          "womens-shoes",
          "mens-shirts",
          "mens-shoes",
          "mens-watches",
          "womens-watches",
          "womens-bags",
          "womens-jewellery",
          "sunglasses",
          "automotive",
          "motorcycle",
          "lighting",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => router.push(`/products/category/${text}`)}
            >
              <ListItemText
                primary={text.charAt(0).toUpperCase() + text.slice(1)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        {["Privacy Policy" , "Contact Us" ,"About Us"].map((text,index)=>(
          <ListItem key={text}>
            <ListItemButton   onClick={() => router.push(`/${infoPages[index]}`)}>
            <ListItemText
                primary={text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor={"left"} open={drawer} onClose={toggleDrawer}>
      {list()}
    </Drawer>
  );
}
