import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import style from "../styles/Home.module.css";
import { useState } from "react";
import PasswordChange from "./PasswordChange";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { pass } from "../utils/validater";
import { CustomButton } from "../utils/customButton";

function VerifyOtp(props) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { setMsg, setSuccess, setAlert, setForgot, emailRef } = props;
  const [otpToken, setOtpToken] = useState(0);
  const [otpVerified, setOtpVerified] = useState(false);
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let api = await fetch("/api/verify-otp", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: otpToken,
    });
    api = await api.json();
    if (api.status === true) {
      setMsg(api.msg);
      setSuccess(true);
      setOtpVerified(true);
    } else {
      setMsg(api.msg);
      setAlert(true);
    }
  };

  const updatePassword = async (data) => {
    data.email = emailRef;
    let api = await fetch("/api/update-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    api = await api.json();
    if (api.status === true) {
      setForgot(false);
      setMsg(api.msg);
      setSuccess(true);
    } else {
      setMsg(api.msg);
      setAlert(true);
    }
  };

  return (
    <div>
      <form className={style.forgotForm}>
        <Typography variant="h6" textAlign="center" color="initial">
          Enter otp{" "}
        </Typography>
        <TextField
          className={style.phone}
          type="number"
          size="small"
          margin="normal"
          name="otpToken"
          label="Enter otp"
          autoFocus
          disabled={otpVerified}
          onChange={(e) => setOtpToken(e.target.value)}
        />
        <CustomButton
          disabled={otpVerified}
          type="submit"
          onClick={onSubmit}
        >
          Verify
        </CustomButton>
      </form>
      <br />

      {/*_________ update password form _________*/}

      <form onSubmit={handleSubmit(updatePassword)}>
        <TextField
          fullWidth
          size="small"
          margin="dense"
          type="password"
          label="Enter new password"
          name="password"
          autoFocus
          disabled={!otpVerified}
          onChange={handleInput}
          {...register("password", {
            required: true,
            // pattern:{
            //   value:pass,
            //   message:"A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required."
            // }
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <TextField
          fullWidth
          size="small"
          margin="dense"
          type="password"
          name="confirmPassword"
          label="Confirm password"
          disabled={!otpVerified}
          onChange={handleInput}
          {...register("confirmPassword", {
            required: true,
            validate: (value) =>
              value === getValues("password") || "Password not match",
          })}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
        />
        <CustomButton
          disabled={!otpVerified}
          style={{backgroundColor:!otpVerified && "#b7b7b7",color:!otpVerified && "grey",marginLeft:"36%"}}
          type="submit"
        >
          Submit
        </CustomButton>
      </form>
    </div>
  );
}

export default VerifyOtp;
