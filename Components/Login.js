import { useState } from "react";
import {
  Typography,
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styleshit from "../styles/Home.module.css";
import { useRouter } from "next/router";
import cookies from "js-cookie";
import { CustomButton } from "../utils/customButton";
import { email} from "../utils/validater";

export default function Login(props) {
  const router = useRouter();
  const { setAlert, setMsg, setSuccess,userCart,setForgot} = props
  const {register,handleSubmit,reset,formState:{ errors }} = useForm();
  const [loginDisable ,setLoginDisable] = useState(false)

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (data) => {
    setLoginDisable(true)
    let api = await fetch("/api/user/login", {
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
      cookies.set("token", api.token);
      userCart();
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      setMsg(api.msg);
      setAlert(true);
    }
  };

  return (
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
            required: true
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
        <CustomButton disabled={loginDisable} type="submit" style={{ marginTop: "10px" }}>
          Login
        </CustomButton>
      </form>
      <br />
      <Button onClick={() => setForgot(true)}> Forget password ?</Button>
    </div>
  );
}
