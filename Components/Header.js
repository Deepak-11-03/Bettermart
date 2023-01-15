import  React,{useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import Link from "next/Link";
import styleshit from "../styles/Home.module.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import {
  List,
  ListItem,
  ListItemText,
  Badge 
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image'
import Form from "./Form";


var data = [ "All","add","Home Decor", "Electronics","Mobiles", "Appliacnces","Fashion","Beauty"];
var pages = ["","addProducts", "home-decor","electronics","mobiles","appliances", "fashion","beauty"];



export default function Header() {
  const theme =useTheme()
  const isMatch =useMediaQuery(theme.breakpoints.down('md'))
  const [formOpen ,setFormOpen]=useState(false)


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ background: "white" }}>
          <Toolbar>
          <Link href='/'>
          <Image src='/logo.png' alt="websitename" width={150} height={48}/>
          </Link>
            <List className={isMatch ? styleshit.sidebar : styleshit.menu} >
            {data.map((item, index) => (
              <ListItem key={index}  sx={{textAlign:"center",display:"block",width:"120px",padding:"4px"}}>
                <Link href={"/" + pages[index]}>
                 
                  <ListItemText  sx={{height:"100%",color:"black"}}>{item}</ListItemText>
             
                </Link>
              </ListItem>
            ))}
            </List>
           <Toolbar sx={{marginLeft:"auto"}}>
           <IconButton >
             <Link href='/cart'> <Badge badgeContent={4} color="secondary"><ShoppingCartIcon sx={{fontSize:"1.6rem",color:"black"}}/></Badge></Link>
            </IconButton>
            <IconButton
              variant="contained"
              
              onClick={()=>setFormOpen(true)}
            >
              <PersonOutlineIcon sx={{fontSize:"28px",color:"black"}} />
            </IconButton>
           </Toolbar>
          </Toolbar>
        </AppBar>
      </Box>
      {formOpen && <Form  formOpen ={formOpen} setFormOpen={setFormOpen}/>}
    </>
  );
}
