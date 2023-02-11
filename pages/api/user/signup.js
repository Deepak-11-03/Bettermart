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
     if(existingEmail.phone == phone){
      return res
        .status(400)
        .send({ status: false, msg: "This  phone is already registered" });
     }
    await userModel.create({firstName, lastName, email, phone, password});
    return res.status(201).send({status:true, msg: "Account Created Successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
export default connectDb(handler);
