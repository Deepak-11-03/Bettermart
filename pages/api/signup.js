import userSchema from "../../models/userModel";
import connectDb from "../../middlerware/middlerware";

const handler = async (req, res) => {
  try {
    let { firstName, lastName, email, phone, password } = req.body;

    let existingUser = await userSchema.findOne({ email, phone });
    if (existingUser) {
      return res
        .status(400)
        .send({ status: false, message: "Email or phone already registered" });
    }
    await userSchema.create({firstName, lastName, email, phone, password});
    return res.status(200).send({ msg: "created" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
export default connectDb(handler);
