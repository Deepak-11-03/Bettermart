// import React from 'react'
import { Box, Tab, Tabs } from "@mui/material";
import {
  Button,
  Typography,
  Snackbar,
  Alert,
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styleshit from "../../styles/Home.module.css";
const email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 530,
  bgcolor: "white",
  boxShadow: 24,
  p: 3,
};
import Signup from "../../Components/Signup";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getCart } from "../../redux/actions/cartAction";
import { useForm } from "react-hook-form";

export default function Form({ formOpen, setFormOpen }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (data) => {
    let api = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    api = await api.json();
    if (api.status === true) {
      reset();
      setMsg(api.msg);
      setSuccess(true);
      localStorage.setItem("name", api.name);
      Cookies.set("token", api.token);
      dispatch(getCart());
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      setMsg(api.msg);
      setAlert(true);
    }
  };

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");

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
        <Alert onClose={alertClose} severity="success" sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={alert}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={alertClose}
      >
        <Alert onClose={alertClose} severity="error" sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>

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
          <div style={{ marginTop: "40px" }}>
            <Typography textAlign="center" variant="h5" padding="5px">
              Welcome Back !
            </Typography>
            <br />
            <form className={styleshit.form} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email *"
                variant="outlined"
                size="small"
                margin="dense"
                name="email"
                autoFocus
                autoComplete="off"
                onChange={handleInput}
                {...register("email", {
                  required: true,
                  pattern: {
                    value: email,
                    message: "Enter valid email",
                  },
                })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
              <FormControl
                variant="outlined"
                size="small"
                margin="dense"
                onChange={handleInput}
                {...register("password", {
                  required: true,
                  pattern: {
                    value: 123,
                    message:
                      "A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.",
                  },
                })}
                error={Boolean(errors.password)}
              >
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{errors.password?.message}</FormHelperText>
              </FormControl>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ marginTop: "10px" }}
              >
                Login
              </Button>
            </form>
            <br />
            <Button> Forget password ?</Button>
          </div>
        )}
        {tabIndex === 1 && (
          <Signup setAlert={setAlert} setMsg={setMsg} setSuccess={setSuccess} />
        )}
      </Box>
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
