import React, { useState } from "react";
import { useRouter } from "next/router";
import styleshit from "../styles/Home.module.css";
import Image from "next/image";
import Form from "./Form";
import Link from "next/Link";
import cookie from "js-cookie";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  Badge,
  Menu,
  TextField,
  useMediaQuery,
  useTheme,
  InputAdornment,
  InputBase,
} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

var data = [
  "Fashion",
  "Home Decor",
  "Electronics",
  "Mobiles",
  "Appliacnces",
  "Beauty",
];
var pages = [
  "mens-shirts",
  "home-decoration",
  "laptops",
  "smartphones",
  "lighting",
  "skincare",
];

export default function Header({ user, setUser, setCartItems, totalItems }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [formOpen, setFormOpen] = useState(false);

  const isCurrentPath = router.asPath;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    handleClose();
    cookie.remove("token");
    // setCartItems({})
    setUser({ value: null });
    router.push("/");
  };

  const getUserProfile = () => {
    setAnchorEl(null);
    router.push(`/user/profile`);
  };
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <AppBar position="fixed" sx={{ background: "white" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} variant="dense">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="websitename"
                width={110}
                height={48}
              />
            </Link>
            {/* <Paper elevation={4} sx={{ display:"flex",alignItems:"center",padding:"0 6px", width:"25rem",borderRadius:"5px" ,display:isMatch && 'none'}}>
            <InputBase placeholder="search ..." sx={{ p: '0 10px',width:"88%" }} />
            <IconButton>
            <SearchIcon color="primary"/>
            </IconButton>
            </Paper>
             */}
            <List
              sx={{ padding: 0 }}
              className={isMatch ? styleshit.sidebar : styleshit.menu}
            >
              <ListItem
                sx={{
                  textAlign: "center",
                  display: "block",
                  width: "120px",
                  padding: "4px",
                }}
              >
                <Link href={`/products`}>
                  <ListItemText
                    sx={{
                      height: "80%",
                      color: "black",
                      borderBottom:
                        isCurrentPath === "/products"
                          ? "1px solid red"
                          : "none",
                    }}
                  >
                     <span style={{fontSize:"15px"}}>All Products</span>
                  </ListItemText>
                </Link>
              </ListItem>
              {data.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    textAlign: "center",
                    display: "block",
                    width: "100px",
                    padding: "4px",
                  }}
                >
                  <Link href={`/products/category/${pages[index]}`}>
                    <ListItemText
                      sx={{
                        height: "80%",
                        color: "black",
                        borderBottom:
                          isCurrentPath === `/products/category/${pages[index]}`
                            ? "1px solid red"
                            : "none",
                      }}
                    >
                      <span style={{fontSize:"15px"}}>{item}</span>
                    </ListItemText>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Toolbar sx={{ gap: "10px" }} variant="dense">
              {user.value ? (
                <Button onClick={handleMenu}>
                  <PersonOutlineIcon
                    sx={{ fontSize: "28px", color: "black" }}
                  />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => setFormOpen(true)}
                  sx={{ width: "6rem" }}
                >
                  Login
                </Button>
              )}
              <IconButton onClick={() => router.push("/user/cart")}>
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCartIcon
                    sx={{ fontSize: "1.6rem", color: "black" }}
                  />
                </Badge>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{ marginTop: "3rem" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={getUserProfile}>
                  {" "}
                  <AccountBoxIcon sx={{ marginRight: "10px" }} /> My Profile{" "}
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Inventory2OutlinedIcon sx={{ marginRight: "10px" }} /> My
                  orders{" "}
                </MenuItem>
                <MenuItem onClick={logout}>
                  <LogoutRoundedIcon sx={{ marginRight: "10px" }} /> Logout
                </MenuItem>
              </Menu>
            </Toolbar>
          </Toolbar>
          <Divider />
        </AppBar>
      </Box>
      {formOpen && <Form formOpen={formOpen} setFormOpen={setFormOpen} />}
    </>
  );
}
