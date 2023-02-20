import connectDb from "../../../utils/dbConnect";
import cartModel from "../../../models/cartModel";
import productModel from "../../../models/productModel";
import jwt from 'jsonwebtoken'

const handler = async (req, res) => {
 

  if(req.method === 'POST'){
  try {
    const user = jwt.verify(req.headers.authorization , process.env.Jwt_Secret_key)
    if(!user){
      return res.status(401).send({msg:"something wrong"})
    }
    let product = await productModel.findById(req.body)
    let userCart = await cartModel.findOne({userId:user.userId})
    let cartData={}
    // if user cart is already created
    if(userCart){
      let existingItem = userCart.items.findIndex(x=>x.productId == req.body)
      //if adding same product in cart
      if(existingItem >= 0){
        let existingProduct = userCart.items[existingItem]
        existingProduct.quantity += 1
        cartData.items = userCart.items
        cartData.totalPrice = userCart.totalPrice + product.price
        cartData.totalItems = userCart.totalItems +1
        const cart = await cartModel.findOneAndUpdate({userId:user.userId},cartData,{new:true}).select({_id:0,userId:0});
        return res.status(200).send({cart})
      }
      //if adding diffrent product in cart
      else{
        let arr = userCart.items;
        let items = {productId:product._id,quantity:1}
        arr.push(items)
        cartData.items = arr;
        cartData.totalPrice = userCart.totalPrice + product.price;
        cartData.totalItems = userCart.totalItems +1
        const cart = await cartModel.findOneAndUpdate({userId:user.userId},cartData,{new:true}).select({_id:0,userId:0});
        return res.status(200).send({cart})
      }
    }
    // creating user's cart
    else{
      let arr= []
      let list = {productId :product._id ,quantity:1}
      arr.push(list)
      let totalPrice = product.price;
      let totalItems = 1;
      let products = {userId:user.userId,items:arr,totalPrice,totalItems}
      let cart = await cartModel.create(products)
      return res.status(201).send({cart})
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
else if(req.method === 'GET'){
  try {
    const user = jwt.verify(req.headers.authorization , process.env.Jwt_Secret_key)
    if(!user){
      return res.status(401).send({msg:"something wrong"})
    }
    let cart = await cartModel.findOne({userId:user.userId}).populate('items.productId').select({_id:0,userId:0});
    return res.status(200).send({status:true,cart:cart });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}
};
export default connectDb(handler);
