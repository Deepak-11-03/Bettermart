import React from "react";
import { useRouter } from "next/router";
import style from "../styles/Home.module.css";
import { Container, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { CustomButton } from "../utils/customButton";

function OrderPlace(props) {
  const router = useRouter();
  const goToOrderPage = () => {
    router.push("/user/order");
  };

  return (
    <div className={style.main}>
      <Container sx={{display:"flex",textAlign:"center"}} maxWidth="md" className={style.checkout}>
        <CheckCircleOutlineIcon
          sx={{ fontSize: "6rem", color: "blueviolet" }}
        />
        <Typography variant="h4" color="initial">
          Your order has been placed successfully
        </Typography>
        <CustomButton onClick={goToOrderPage}>GoTo Orders</CustomButton>
      </Container>
    </div>
  );
}

export default OrderPlace;
