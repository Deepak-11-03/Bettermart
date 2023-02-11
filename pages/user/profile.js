import { Container, Typography, Paper, TextField, Button, Snackbar, Alert } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import style from "../../styles/Home.module.css";

export default function profile() {
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
 
  const [alert, setAlert] = useState(false);
  const [success ,setSuccess] =useState(false)
  const [msg,setMsg] =useState('')
 const alertClose = () => {
    setAlert(false);
    setSuccess(false)
  };


  useEffect(()=>{
   const getUser = async()=>{
    const result = await fetch(`http://localhost:3000/api/user/user-profile`, {
      method: "GET",
      headers: {
        authorization: Cookies.get('token'),
      },
    });
     let profile = await result.json();
     setUser(profile)
   }
   getUser()
  },[])



  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateUser = async (e) => {

    e.preventDefault()
    let api = await fetch("http://localhost:3000/api/user/user-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify(user),
    });

    api = await api.json();

    if(api.status === true){
      setSuccess(true)
      setEditable(false)
      setMsg(api.msg)
    }
    else{
      setAlert(true)
      setMsg(api.msg)
    }

  };

  return (
    <div className={style.main}>
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
      <Container sx={{ padding: "15px" }}>
        <form onSubmit={updateUser}>
          <Typography
            variant="caption"
            sx={{ fontSize: "16px", fontWeight: "600", marginRight: "8px" }}
          >
            Personal Information
          </Typography>
          <Button
            sx={{ float: "right" }}
            onClick={() => setEditable(!editable)}
          >
            {editable ? (
              <Typography variant="button">cancel</Typography>
            ) : (
              <Typography variant="button">Edit</Typography>
            )}
          </Button>
          <br />
          <TextField
            label="FirstName"
            size="small"
            name="firstName"
            required
            margin="normal"
            disabled={editable ? false : true}
            onChange={handleInput}
            value={user.firstName}
          />
          <TextField
            label="LastName"
            name="lastName"
            size="small"
            required
            margin="normal"
            disabled={editable ? false : true}
            value={user.lastName}
            onChange={handleInput}
          />
          <br />
          <TextField
            label="Email"
            name="email"
            size="small"
            type='email'
            required
            margin="normal"
            disabled={editable ? false : true}
            onChange={handleInput}
            value={user.email}
          />
          <TextField
            label="phone"
            size="small"
            name="phone"
            required
            margin="normal"
            disabled={editable ? false : true}
            onChange={handleInput}
            value={user.phone }
          />
          <br />
          <br />
          <Typography
            variant="caption"
            sx={{ fontSize: "16px", fontWeight: "600", marginRight: "8px" }}
          >
            Personal Information
          </Typography>
          <br />
          {editable && (
            <Button type="submit" variant="contained">
              Save
            </Button>
          )}
        </form>
      </Container>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const cookie = ctx.req?.headers.cookie;

  if (!cookie) {
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
