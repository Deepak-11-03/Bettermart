import userSchema from "../../../models/userModel";
import connectDb from "../../../utils/dbConnect";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await userSchema.findOne({ email, password });
    if (!user) {
      return res
        .status(400)
        .send({ status: false, msg: "Email or password wrong" });
    }
    const token = jwt.sign(
      { userId: user._id, email: email },
      process.env.Jwt_Secret_key
    );
    return res
      .status(200)
      .send({
        status: true,
        msg: "login Successfully",
        name: user.firstName,
        token: token,
      });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};
export default connectDb(handler);
