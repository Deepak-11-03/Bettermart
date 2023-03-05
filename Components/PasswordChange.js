import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { pass } from "../utils/validater";

function PasswordChange(props) {
  const { setMsg, setAlert, setSuccess, setForgot, emailRef } = props;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        size="small"
        margin="dense"
        type="password"
        label="Enter new password"
        name="password"
        onChange={handleInput}
        {...register("password", {
          required: true,
          pattern:{
            value:pass,
            message:"A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required."
          }
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
        onChange={handleInput}
        {...register("confirmPassword", {
          required: true,
          validate: (value) =>
            value === getValues("password") || "Password not match",
        })}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
      />
      <Button fullWidth variant="contained" type="submit" color="primary">
        Submit
      </Button>
    </form>
  );
}

export default PasswordChange;
