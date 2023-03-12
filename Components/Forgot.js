import { Box, TextField, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UpdatePassword from "./UpdatePassword";
import style from "../styles/Home.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton } from "../utils/customButton";

const styled = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  minHeight: 350,
  bgcolor: "white",
  boxShadow: 24,
  p: 3,
};

function Forgot(props) {
  const {setAlert, setMsg, setSuccess, setForgot}= props
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [otpPage, verifyOtpPage] = useState(false);
  const [email, setEmail] = useState("");
  const [emailRef,setEmailRef] = useState()

  const onSubmit = async(data)=>{
    setEmailRef(JSON.stringify(data.email))
    let api = await fetch('/api/forgot-password',{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    api = await api.json()
    if(api.status===true){
      setMsg(api.msg)
      setSuccess(true)
      verifyOtpPage(true)
    }
    else{
      setMsg(api.msg)
      setAlert(true)
    }
  }

  return (
    <Box sx={styled}>
      <div>
        <Button
          variant="text"
          color="primary"
          sx={{ width: "30%" }}
          startIcon={<ArrowBackIosIcon />}
          onClick={() => setForgot(false)}
        >
          Back
        </Button>

        {otpPage ? (
          <UpdatePassword {...{...props,emailRef}} />
        ) : (
          <form className={style.forgotForm} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" textAlign="center" color="initial">
              Enter your email
            </Typography>
            <TextField
              size="small"
              fullWidth
              type="text"
              label="Enter email"
              margin="normal"
              name="email"
              autoFocus
              // value={email}
              onChange={(e) => setEmail(e.target.value)}
              {...register('email',{
                required:true,
                pattern:{
                  value:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/,
                  message:"Enter valid email"
                }
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <CustomButton
            type="submit"
              // onClick={() => verifyOtpPage(true)}
            >
              Next
            </CustomButton>
          </form>
        )}
      </div>
    </Box>
  );
}

export default Forgot;
