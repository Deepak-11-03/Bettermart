// import React from 'react'
import {
  Box,
  Tab,
  Tabs,
  Modal,
  Fade,
  Backdrop,
  Snackbar,
  Alert
} from "@mui/material";
import { useState } from "react";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    height: 530,
    bgcolor: "white",
    border: "1px solid #000",
    boxShadow: 24,
    p: 3,
  };

  import Login from './Login'
import Signup from "./Signup";

export default function Form({ formOpen, setFormOpen }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };
  const handleClose = () => {
    setFormOpen(false);
  };

  const [alert, setAlert] = useState(false);
  const [success ,setSuccess] =useState(false)
  const [msg,setMsg] =useState('')

  const alertClose = () => {
    setAlert(false);
    setSuccess(false)
  };


  return (
    <>
    <Snackbar open={success}  autoHideDuration={4000} anchorOrigin={{vertical:"top",horizontal:"center"}} onClose={alertClose}>
        <Alert onClose={alertClose} severity="success" sx={{ width: "100%" }}>
           {msg}
        </Alert>
      </Snackbar>
      <Snackbar open={alert}  autoHideDuration={4000} anchorOrigin={{vertical:"top",horizontal:"center"}} onClose={alertClose}>
        <Alert onClose={alertClose} severity="error" sx={{ width: "100%" }}>
           {msg}
        </Alert>
      </Snackbar>
      <Modal
        open={formOpen}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={formOpen}>
          <Box sx={style}>
            <Tabs value={tabIndex} onChange={handleTabChange} centered sx={{paddingBottom:"10px"}}>
              <Tab label="Login" sx={{width:"50%"}} />
              <Tab label="Register" sx={{width:"50%"}} />
            </Tabs>
            
              {tabIndex === 0 && (
                <Login setAlert={setAlert} setMsg={setMsg} setSuccess={setSuccess} setFormOpen={setFormOpen}/>
              )}
              {tabIndex === 1 && (
                <Signup setAlert={setAlert} setMsg={setMsg} setSuccess={setSuccess} setFormOpen={setFormOpen}/>
              )}
          </Box>
        </Fade>
      </Modal>
                </>
  );
}
