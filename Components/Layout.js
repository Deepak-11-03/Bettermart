// import Cookies from 'js-cookie';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import Footer from './Footer';
// import Header from './Header';

// export default function Layout({children}) {
//     const [totalItems, setTotalItems] = useState(0);
//     const [user, setUser] = useState({ value: null });
  
//     const [cartItems, setCartItems] = useState([]);
//     const router = useRouter();
  
//     useEffect(() => {
     
//       const token = Cookies.get("token");
//       if (token) {
//         setUser({ value: token });
//       } else {
//         setUser({ value: null });
//       }
//     }, [router.query]);
//    var total;
//     const fetchCart = async () => {
//         let api = await fetch("http://localhost:3000/api/user/cart", {
//           method: "GET",
//           headers: {
//             authorization: Cookies.get("token"),
//           },
//         });
//         let cart = await api.json();
//         setCartItems(cart.cart);
//         if(cart.cart && cart.cart.items){
//           total = cart.cart.totalItems
//           setTotalItems(total)
//          }
         
//     };
  
  
//     useEffect(() => {
//       if (Cookies.get("token")) {
//       fetchCart();
//       }
//       else{
//         setTotalItems(0)
//       }
//     }, [cartItems && cartItems.totalItems ,user.value]); 
  
//   return (
//     <div >
//      <Header user={user} setUser={setUser} cartItems={cartItems}  setCartItems={setCartItems} totalItems={totalItems} setTotalItems={setTotalItems} />
//       <main >
//         {children}
//       </main>
//       <Footer/>
//     </div>
//   )
// }