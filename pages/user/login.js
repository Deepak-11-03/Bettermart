// import React from 'react'
import { Box, Tab, Tabs } from "@mui/material";
import {Snackbar,Alert} from "@mui/material";
import { useState} from "react";
import Signup from "../../Components/Signup";
import { useDispatch } from "react-redux";
import { getCart } from "../../redux/actions/cartAction";
import Forgot from "../../Components/Forgot";
import Login from "../../Components/Login";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 550,
  bgcolor: "white",
  boxShadow: 24,
  p: 3,
};


export default function Form() {
  const dispatch = useDispatch();

  const[forgot ,setForgot] = useState(false)
  const [tabIndex, setTabIndex] = useState(0);
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  function userCart(){
    dispatch(getCart());
  }
  const handleTabChange = (event,newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const alertClose = () => {
    setAlert(false);
    setSuccess(false);
  };

  return (
    <>
      <Snackbar
        open={success}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={alertClose}
      >
        <Alert onClose={alertClose}  variant="filled" severity="success" sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={alert}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={alertClose}
      >
        <Alert onClose={alertClose}  variant="filled" severity="error" sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>

      
       {forgot ? <Forgot {...{setMsg,setSuccess,setAlert,setForgot}}/> :
       
       <>
       <Box sx={style}>
       <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          sx={{ paddingBottom: "10px" }}
        >
          <Tab label="Login" sx={{ width: "50%" }} />
          <Tab label="Register" sx={{ width: "50%" }} />
        </Tabs>

        {tabIndex === 0 && (
          <Login setAlert={setAlert} setMsg={setMsg} setSuccess={setSuccess} userCart={userCart} setForgot={setForgot}/>
        )}
        {tabIndex === 1 && (
          <Signup setAlert={setAlert} setMsg={setMsg} setSuccess={setSuccess} />
        )}
        </Box>
       </>
       }
      
    </>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = ctx.req?.headers.cookie;

  if (cookie) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
