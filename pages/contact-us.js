import { Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import style from '../styles/Home.module.css';
import { CustomButton } from '../utils/customButton';
   
function contactUs() {

const[message,setMessage] = useState({name:"",email:"",message:""})

const handleChange =(e)=>{
    setMessage({...message,[e.target.name]:e.target.value})
}


  return (
    <div className={style.main} style={{marginTop:"10rem"}}>
      <Paper elevation={3} sx={{width:"25rem",margin:"auto",padding:"15px"}}>
      <Typography variant="h4" textAlign="center" >Contact Us</Typography>
        <Box>
         <form>
         <TextField
         name='name'
         label="Name"
         fullWidth
         margin='dense'
         size="small"
            value={message.name}
            onChange={handleChange}
          />
          <TextField
          name='email'
          label="Email"
          fullWidth
          margin='dense'
          size="small"
          type="email"
            value={message.email}
            onChange={handleChange}
          />
          <TextField
          name='message'
          label="Message"
          fullWidth
          margin='dense'
          size="small"
          multiline
          rows={5}
            value={message.message}
            onChange={handleChange}
          />
          <CustomButton>Submit</CustomButton>
         </form>
        </Box>
      </Paper>
    </div>
  )
}

export default contactUs
