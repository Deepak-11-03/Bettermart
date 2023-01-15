// import { Modal,Backdrop,Fade,TextField, } from '@mui/icons-material'
// import React from 'react'

// export default function AddProduct() {
//   return (
//     <div>
//        <Modal
//         open={formOpen}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//          <Fade in={formOpen}>
//               <Typography textAlign="center" variant="h5" padding="5px">
//               </Typography>
//               <br/>
//               <form
//                 className={styleshit.form}
//                 onSubmit={handleSubmit(onSubmit)}
//               >
//                 <TextField
//                   label="Email *"
//                   variant="outlined"
//                   size="small"
//                   margin="dense"
//                   name="email"
//                   autoFocus
//                   autoComplete="off"
//                   onChange={handleInput}
//                   {...register("email", {
//                     required: true,
//                     pattern: {
//                       value: email,
//                       message: "Enter valid email",
//                     },
//                   })}
//                   error={Boolean(errors.email)}
//                   helperText={errors.email?.message}
//                 />
//                 <FormControl
//                   variant="outlined"
//                   size="small"
//                   margin="dense"
//                   onChange={handleInput}
//                   {...register("password", {
//                     required: true,
//                     pattern: {
//                       value: 123,
//                       message:
//                         "A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.",
//                     },
//                   })}
//                   error={Boolean(errors.password)}
//                 >
//                   <InputLabel>Password</InputLabel>
//                   <OutlinedInput
//                     label="Password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={handleClickShowPassword}
//                           edge="end"
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                   />
//                   <FormHelperText>{errors.password?.message}</FormHelperText>
//                 </FormControl>
//                 <Button
//                   type="submit"
//                   color="primary"
//                   variant="contained"
//                   style={{ marginTop: "10px" }}
//                 >
//                   Login
//                 </Button>
//               </form>
//               <br/>
//               <Button > Forget password ?</Button>
//       <Snackbar open={alert} autoHideDuration={6000} onClose={alertClose}>
//         <Alert onClose={alertClose} severity="success" sx={{ width: "100%" }}>
//           This is a success message!
//         </Alert>
//       </Snackbar>
//          </Fade>
//       </Modal>
//     </div>
//   )
// }
