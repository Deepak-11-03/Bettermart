import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const CustomButton = styled(Button)({
    color:"white",
    backgroundColor:"#c339ff",
    "&:hover": {
        backgroundColor: "#b922fa",
      },
      "&:disabled":{
        backgroundColor:"#b7b7b7",
        color:"grey"
      }
})