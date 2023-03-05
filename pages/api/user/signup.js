import userModel from "../../../models/userModel";
import connectDb from "../../../utils/dbConnect";

const handler = async (req, res) => {
  try {
    let { firstName, lastName, email, phone, password } = req.body;

    let existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "This Email is already registered" });
    }
    let existingPhone = await userModel.findOne({phone})
     if(existingPhone){
      return res
        .status(400)
        .send({ status: false, msg: "This  phone is already registered" });
     }

    
    await userModel.create({firstName, lastName, email, phone, password,otpToken:0});
    return res.status(201).send({status:true, msg: "Account Created Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
export default connectDb(handler);
