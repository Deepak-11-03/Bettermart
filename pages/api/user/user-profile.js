import userModel from "../../../models/userModel";
import connectDb from "../../../utils/dbConnect";
import jwt from 'jsonwebtoken'

const handler = async (req, res) => {
  if(req.method==="GET"){
    try {
      const token = jwt.verify(req.headers.authorization , process.env.Jwt_Secret_key)
  
      let user = await userModel.findById({_id:token.userId}).select({_id:0,__v:0,password:0});
      if (!user) {
        return res
          .status(400)
          .send({ status: false, msg: "no user found" });
      } 
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
  else if(req.method === "PUT"){
    try {
      console.log(req.body)
      const token = jwt.verify(req.headers.authorization , process.env.Jwt_Secret_key)
      let {firstName, lastName,email,phone} = req.body
      let existingEmail = await userModel.findOne({ email });
      if(existingEmail){
        if(existingEmail._id != token.userId){
          return res.status(400).send({status:false,msg:"This email is already registered"})
        }
      }
      let existingPhone = await userModel.findOne({ phone });
      if(existingPhone){
        if(existingPhone._id != token.userId){
          return res.status(400).send({status:false,msg:"This email is already registered"})
        }
      }

      let user  = await userModel.findOneAndUpdate({_id:token.userId},req.body,{new:true})

      return res.status(200).send({status: true,msg:"Your pofile update successfully"})
      
      
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
};
export default connectDb(handler);
