import { useRouter } from 'next/router'
import React,{createContext, useEffect} from 'react'
import cookie from 'js-cookie';
import { useState } from 'react';
export const ContextApi = createContext()


 function Context({children}) {
  const [anchorEl, setAnchorEl] = useState(null);
 const [totalItems ,setTotalItems] = useState(0)
 const [cartItems, setCartItems] = useState({});
  const router =useRouter()


  
  
  return (
    <ContextApi.Provider value={{anchorEl,setAnchorEl ,totalItems,setTotalItems}} >
      {children}
    </ContextApi.Provider>
  )
}

export default Context