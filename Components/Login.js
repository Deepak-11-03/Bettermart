import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styleshit from "../styles/Home.module.css";

const email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;

export default function Login({ open, setOpen }) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

//   const [signup, setSignup] = useState(false);
//   const signupFormOpen = () => {
//     reset();
//     setSignup(true);
//   };

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClose = () => {
    // reset();
    setOpen(false);
  };
  const [alert, setAlert] = React.useState(false);
  const alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };


  const onSubmit = async (data) => {
    let api = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    api = await api.json();
    if (api) {
      setAlert(true);
      handleClose();
    }
  };

  return (
    <div style={{marginTop:"50px"}}>
              <Typography textAlign="center" variant="h5" padding="5px">
                Welcome Back !
              </Typography>
              <br/>
              <form
                className={styleshit.form}
                onSubmit={handleSubmit(onSubmit)}
              >
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
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
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
              <br/>
              <Button > Forget password ?</Button>
      <Snackbar open={alert} autoHideDuration={6000} onClose={alertClose}>
        <Alert onClose={alertClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}
