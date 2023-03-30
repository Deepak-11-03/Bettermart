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
  Button,
} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CustomButton } from "../utils/customButton";
import MenuIcon from "@mui/icons-material/Menu";

var data = [
  "Grocery",
  "Fashion",
  "Home Decor",
  "Electronics",
  "Mobiles",
  "Appliacnces",
  "Beauty",
];
var pages = [
  "groceries",
  "mens-shirts",
  "home-decoration",
  "laptops",
  "smartphones",
  "lighting",
  "skincare",
];
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_CART } from "../redux/constants/cartContant";

export default function Header({ user, setDrawer }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  const isCurrentPath = router.asPath;

  const handleMenuOpen = () => {
    setOpen(true);
  };
  const handleMenuClose = () => {
    setOpen(false);
  };
  const getUserOrder = () => {
    setOpen(false);
    router.push(`/user/order`);
  };

  const logout = () => {
    localStorage.clear();
    handleMenuClose();
    dispatch({ type: CLEAR_CART });
    cookie.remove("token");
    router.push("/");
  };

  const userMenu = [
    { icon: <Inventory2OutlinedIcon />, name: "Orders", action: getUserOrder },
    { icon: <LogoutRoundedIcon />, name: "Logout", action: logout },
  ];

  const productSearch = () => {
    router.push(`/products/search?query=${search}`)
  };

  return (
    <>
      <Box sx={{ width: "100vw" }}>
        <AppBar position="fixed" sx={{ background: "white" }}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0",
            }}
            variant="dense"
          >
            <Toolbar variant="dense" sx={{ padding: "0px", width: "80%" }}>
              {" "}
              {isMatch && (
                <IconButton onClick={() => setDrawer(true)}>
                  <MenuIcon />
                </IconButton>
              )}
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="websitename"
                  width={110}
                  height={48}
                />
              </Link>
              <Box className={style.searchbarmid}>
                <InputBase
                  sx={{ width: "100%" }}
                  placeholder="Search product"
                  inputProps={{ "aria-label": "search product" }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={productSearch}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Toolbar>
            <Toolbar variant="dense">
              {/* user login menu */}

              {!user ? (
                <CustomButton
                  onClick={() => router.push("/user/login")}
                  sx={{ width: "6rem" }}
                >
                  Login
                </CustomButton>
              ) : (
                <Box
                  onMouseEnter={handleMenuOpen}
                  onMouseLeave={handleMenuClose}
                  sx={{ zIndex: 6 }}
                >
                  <PersonOutlineIcon
                    sx={{ fontSize: "28px", color: "black", cursor: "pointer" }}
                  />
                  {open && (
                    <List
                      style={{
                        position: "absolute",
                        right: "0",
                        top: "2.5rem",
                        width: "9rem",
                        background: "white",
                        border: "1px solid black",
                        padding: "0",
                      }}
                    >
                      {userMenu.map((list, index) => {
                        return (
                          <>
                            <ListItemButton onClick={list.action} key={index}>
                              <ListItemIcon sx={{ minWidth: "35px" }}>
                                {list.icon}
                              </ListItemIcon>
                              <ListItemText
                                primary={list.name}
                                sx={{ color: "black" }}
                              />
                            </ListItemButton>
                            <Divider />
                          </>
                        );
                      })}
                    </List>
                  )}
                </Box>
              )}
              <IconButton onClick={() => router.push("/cart")}>
                <Badge badgeContent={cart && cart.totalItems} color="secondary">
                  <ShoppingCartIcon
                    sx={{ fontSize: "1.6rem", color: "black" }}
                  />
                </Badge>
              </IconButton>
            </Toolbar>
          </Toolbar>
          {/* search bar small screen */}
          <Divider />
          <Box className={style.searchbarsmall}>
            <InputBase
              sx={{ width: "100%" }}
              placeholder="Search product"
              inputProps={{ "aria-label": "search product" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={productSearch}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          {isCurrentPath !== "/user/login" && (
            <Toolbar
              variant="dense"
              sx={{ display: isMatch ? "none" : "block" }}
            >
              {/* links */}
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
                            isCurrentPath ===
                            `/products/category/${pages[index]}`
                              ? "2px solid #b922fa"
                              : "none",
                        }}
                      >
                        <span style={{ fontSize: "16px" }}>{item}</span>
                      </ListItemText>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Toolbar>
          )}
          <Divider />
        </AppBar>
      </Box>
    </>
  );
}
