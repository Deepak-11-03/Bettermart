import React, { useState } from "react";
import { useRouter } from "next/router";
import style from "../styles/Home.module.css";
import Image from "next/image";
import Form from "./Form";
import Link from "next/link";
// import {Link} from 'next'
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
  ListItemButton,
  ListItemIcon,
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
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../redux/actions/cartAction";
import { CLEAR_CART } from "../redux/constants/cartContant";


export default function Header({ user }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [formOpen, setFormOpen] = useState(false);
  const dispatch = useDispatch()

  const { cart } = useSelector((state) => state.cart);

  const isCurrentPath = router.asPath;

  const handleMenuOpen = () => {
    setOpen(true);
  };
  const handleMenuClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    handleMenuClose();
    dispatch({type:CLEAR_CART})
    cookie.remove("token");
    router.push("/");
  };

  // const getUserProfile = () => {
  //   setOpen(false);
  //   router.push(`/user/profile`);
  // };
  const getUserOrder = () => {
    setOpen(false);
    router.push(`/user/order`);
  };


  const userMenu =[
    // {icon:<AccountBoxIcon/> , name:"My Profile" , action:getUserProfile},
    {icon:<Inventory2OutlinedIcon/> , name:"Orders",action:getUserOrder},
    {icon:<LogoutRoundedIcon/> ,name:"Logout",action:logout},
  ]



  return (
    <>
      <Box sx={{ width: "100%" }}>
        <AppBar position="fixed" sx={{ background: "white" }}>
          <Toolbar
            sx={{ display: "flex", justifyContent: "space-between" }}
            variant="dense"
          >
            <Link href="/">
              <Image
                src="/logo.png"
                alt="websitename"
                width={110}
                height={48}
              />
            </Link>
            <List
              sx={{ padding: 0 }}
              className={isMatch ? style.sidebar : style.menu}
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
                          ? "2px solid #b922fa"
                          : "none",
                    }}
                  >
                    <span style={{ fontSize: "15px" }}>All Products</span>
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
                            ? "2px solid #b922fa"
                            : "none",
                      }}
                    >
                      <span style={{ fontSize: "15px" }}>{item}</span>
                    </ListItemText>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Toolbar sx={{ gap: "10px" }} variant="dense">

              {/* user login menu */}

              {!user ? (
                <Button
                  variant="contained"
                  onClick={() => router.push("/user/login")}
                  sx={{ width: "6rem" }}
                  className={style.button}
                >
                  Login
                </Button>
              ) : (
                <Box
                  onMouseEnter={handleMenuOpen}
                  onMouseLeave={handleMenuClose}
                >
                  <PersonOutlineIcon
                    sx={{ fontSize: "28px", color: "black" ,cursor:"pointer"}}
                  />
                  {open && (
                    <List style={{ position: "absolute",right:"0",top:"2.5rem", width:"9rem", background: "white",border:"1px solid black",padding:"0" }}>
                    {userMenu.map((list,index)=>{
                      return(
                        <>
                        <ListItemButton onClick={list.action} key={index}>
                        <ListItemIcon sx={{minWidth:"35px"}}>{list.icon}</ListItemIcon>
                        <ListItemText primary={list.name} sx={{color:"black"}} />
                      </ListItemButton>
                      <Divider/>
                        </>
                     
                      )
                    })}
                    </List>               
                  )}
                </Box>
              )}
              <IconButton onClick={() => router.push("/cart")}>
                <Badge badgeContent={ cart && cart.totalItems} color="secondary">
                  <ShoppingCartIcon
                    sx={{ fontSize: "1.6rem", color: "black" }}
                  />
                </Badge>
              </IconButton>
            </Toolbar>
          </Toolbar>
          <Divider />
        </AppBar>
      </Box>
      {formOpen && <Form formOpen={formOpen} setFormOpen={setFormOpen} />}
    </>
  );
}
