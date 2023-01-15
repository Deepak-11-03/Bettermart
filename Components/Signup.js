import * as React from "react";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";
import styleshit from "../styles/Home.module.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


export default function Signup({setSignup}) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const alertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleClose = () => {
    setSignup(false);
  };

  const [alert, setAlert] = React.useState(false);

  const email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/;
  const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  const phone = /^[789]\d{9}$/;

  const onSubmit = async (data) => {
    let api = await fetch("http://localhost:3000/api/signup", {
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
    <div>
        <form className={styleshit.form} onSubmit={handleSubmit(onSubmit)}>
          <Typography textAlign="center" variant="h5" padding="5px">
            Register here
          </Typography>
          <br />
          <TextField
            type="text"
            label="FirstName *"
            variant="outlined"
            size="small"
            margin="dense"
            autoFocus={true}
            autoComplete="off"
            name="firstName"
            onChange={handleInput}
            {...register("firstName", {
              required: true,
              maxLength: { value: 10, message: "Max length is 10" },
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "Only letters allowed",
              },
            })}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="LastName *"
            variant="outlined"
            size="small"
            margin="dense"
            name="lastName"
            autoComplete="off"
            onChange={handleInput}
            {...register("lastName", {
              required: true,
              maxLength: { value: 10, message: "Max length is 10" },
            })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
          />
          <TextField
            label="Email *"
            variant="outlined"
            size="small"
            margin="dense"
            name="email"
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
          <TextField
            className={styleshit.phone}
            label="Phone *"
            variant="outlined"
            size="small"
            margin="dense"
            name="phone"
            id="phone"
            autoComplete="off"
            onChange={handleInput}
            {...register("phone", {
              required: true,
              pattern: {
                value: phone,
                message: "Enter a valid Mobile number",
              },
            })}
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
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
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{errors.password?.message}</FormHelperText>
          </FormControl>
          <TextField
            type="password"
            label="Confirm Password *"
            variant="outlined"
            size="small"
            margin="dense"
            name="confirmPassword"
            autoComplete="off"
            onChange={handleInput}
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === getValues("password") || "Password not match",
            })}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            Register
          </Button>
        </form>
        <br />
      <Snackbar open={alert} autoHideDuration={6000} onClose={alertClose}>
        <Alert onClose={alertClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}
