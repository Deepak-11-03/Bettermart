import { Box, Typography } from "@mui/material";
import style from "../styles/Home.module.css";

function Error() {
  return (
    <div className={style.main}>
    <Box
      sx={{
        padding:"8rem",
        marginTop:"3rem",
        textAlign:"center"
      }}
    >
      <Typography variant="h5" color="initial">
        An error occurred on server
      </Typography>
      <Typography variant="h5" color="initial">
        Please check your internet connection
      </Typography>
    </Box>
    </div>
  );
}
export default Error;
