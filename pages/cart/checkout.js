import Head from "next/head";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import style from "../../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderPlace from "../../Components/OrderPlace";
import { states, cities } from "../../utils/stateAndCity";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box } from "@mui/system";
import {FormControl,InputLabel, MenuItem,Select,TextField,Typography,Grid,Button,Paper,useTheme,useMediaQuery} from "@mui/material";
import { CustomButton } from "../../utils/customButton";
import { getCart } from "../../redux/actions/cartAction";
import { CLEAR_CART } from "../../redux/constants/cartContant";

const ITEM_HEIGHT = 80;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: "200px",
    },
  },
};



function checkout({ user }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const { cart } = useSelector((state) => state.cart);
  const [orderPage, setOrderPage] = useState(false);
  const [saveAddress, setSaveAddress] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phone: "",
  });
  const [address, setAddress] = useState({
    houseNo: "",
    street: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
  });

  const fetchingCart = () => {
    dispatch(getCart());
  };
  const handleInput = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handleAddressInput = (e) => {
    if (e.target.name === "state") {
      let city = cities[e.target.value];
      setAddress({ ...address, city: city[2] });
    }
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    let api = await fetch("/api/user/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("token"),
      },
      body: JSON.stringify({ ...address, ...shippingDetails }),
    });
    api = await api.json();
    if (api.status === true) {
      dispatch({ type: CLEAR_CART });
      setOrderPage(true);
    }
  };

  useEffect(() => {
    if (!Cookies.get("token")) {
      router.back();
    }
    if (!cart.items) {
      fetchingCart();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Cart checkout</title>
      </Head>
      <div className={style.main}>
        {orderPage ? (
          <OrderPlace {...{ placeOrder, cart }} />
        ) : (
          <>
            {cart && cart.items && (
              <>
                <Grid container spacing={2} padding={4}>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Typography textAlign="center" variant="h6" color="initial">
                      Contact Details
                    </Typography>
                    <Button
                      sx={{
                        margin: "auto",
                        float: "right",
                        textDecoration: "underline",
                      }}
                      disabled={!saveAddress}
                      onClick={() => setSaveAddress(false)}
                    >
                      Edit
                    </Button>
                    <TextField
                      label="Name"
                      size="small"
                      name="name"
                      disabled={saveAddress}
                      fullWidth
                      required
                      margin="normal"
                      onChange={handleInput}
                      value={shippingDetails.name}
                    />
                    <TextField
                      type="number"
                      label="Mobile number"
                      size="small"
                      name="phone"
                      disabled={saveAddress}
                      className={style.phone}
                      fullWidth
                      required
                      margin="normal"
                      onChange={handleInput}
                      value={shippingDetails.phone}
                    />

                    <Typography textAlign="center" variant="h6" color="initial">
                      Shipping Address
                    </Typography>
                    <TextField
                      label="House No"
                      size="small"
                      name="houseNo"
                      disabled={saveAddress}
                      fullWidth
                      required
                      margin="normal"
                      onChange={handleAddressInput}
                      value={address.houseNo}
                    />
                    <TextField
                      label="street"
                      size="small"
                      name="street"
                      disabled={saveAddress}
                      fullWidth
                      required
                      margin="normal"
                      onChange={handleAddressInput}
                      value={address.street}
                    />
                    <TextField
                      label="area"
                      size="small"
                      name="area"
                      disabled={saveAddress}
                      fullWidth
                      required
                      margin="normal"
                      onChange={handleAddressInput}
                      value={address.area}
                    />
                    <br />
                    <FormControl fullWidth size="small" margin="normal">
                      <InputLabel>--Select State--</InputLabel>
                      <Select
                        label="--Select State--"
                        name="state"
                        disabled={saveAddress}
                        value={address.state}
                        MenuProps={MenuProps}
                        onChange={handleAddressInput}
                      >
                        {states.map((state, index) => (
                          <MenuItem key={index} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {address.state && (
                      <FormControl fullWidth size="small" margin="normal">
                        <InputLabel>--Select city--</InputLabel>
                        <Select
                          label="--Select city--"
                          name="city"
                          disabled={saveAddress}
                          value={address.city || ""}
                          MenuProps={MenuProps}
                          onChange={handleAddressInput}
                        >
                          {cities[address.state].map((city, index) => (
                            <MenuItem key={index} value={city}>
                              {city}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                    <TextField
                      name="pincode"
                      label="Pincode"
                      size="small"
                      disabled={saveAddress}
                      fullWidth
                      required
                      margin="normal"
                      value={address.pincode}
                      onChange={handleAddressInput}
                    />
                    <CustomButton
                      className={style.addressSave}
                      sx={{ margin: "auto" }}
                      disabled={saveAddress}
                      variant="contained"
                      onClick={() => setSaveAddress(true)}
                    >
                      Deliver to this Address
                    </CustomButton>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Paper
                      className={style.orderDetails}
                      elevation={3}
                      sx={{
                        width: isMatch ? "100%" : "18rem",
                        padding: "10px",
                        margin: "auto",
                      }}
                    >
                      <Typography variant="h5" color="initial">
                        Order Summery
                      </Typography>
                      <br />
                      {/* <CardContent sx={{ border: ".5px solid #dee2e6" }}> */}
                      <Typography variant="h6" color="black">
                        Total Items : <span>{cart ? cart.totalItems : 0}</span>
                      </Typography>
                      {/* <br /> */}
                      <Typography variant="h6" color="black">
                        Subtotal : <span>Rs {cart ? cart.totalPrice : 0}</span>
                      </Typography>
                      <Typography variant="h6" color="black">
                        Shipping : <span style={{ color: "green" }}>Free</span>
                      </Typography>
                      <Typography variant="h6" color="black">
                        Total amount :{" "}
                        <span>Rs {cart ? cart.totalPrice : 0}</span>
                      </Typography>
                      <br />
                      {/* </CardContent> */}
                    </Paper>
                    <Paper
                      className={style.orderDetails}
                      elevation={3}
                      sx={{
                        width: isMatch ? "100%" : "18rem",
                        padding: "10px",
                        margin: "15px auto",
                      }}
                    >
                      <Typography variant="h5" color="initial">
                        Payment Mehtod
                      </Typography>
                      <br />
                      <Box sx={{ backgroundColor: "#95d595", padding: "5px" }}>
                        <Typography variant="h5" color="initial">
                          Cash on Delivery{" "}
                          <CheckCircleOutlineIcon
                            sx={{
                              float: "right",
                              marginTop: "5px",
                              color: "green",
                            }}
                          />
                        </Typography>
                      </Box>
                      <CustomButton
                        onClick={placeOrder}
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: "12px" }}
                      >
                        Place order
                      </CustomButton>
                    </Paper>
                  </Grid>
                </Grid>
                <br />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default checkout;
