import { Container } from "@mui/material";
import React from "react";
import style from "../styles/Home.module.css";
export default function cart() {
  //     const router = useRouter()
  //   function detailed(id){
  //     router.push(`/products/${id}`)
  //   }
  return (
    <div className={style.main}>
      <Container maxWidth="sm" sx={{ backgroundColor: "lightBlue" }}>
        this is cart
      </Container>
    </div>
  );
}
