import userSchema from "../../models/userModel";
import connectDb from "../../utils/dbConnect";


const handler = async(req,res)=>{
    try {
        let otpToken = req.body;
        const timeOutId = setTimeout(() => {
            return res.status(500).send({ status: false, msg: "something wrong" });
        }, 10000);
        
        const userOtp  = await userSchema.findOne({otpToken})
        clearTimeout(timeOutId);
        if(!userOtp){
            return res.status(400).send({status:false,msg:"invalid otp"})
        }
        userOtp.otpToken = null
        userOtp.save();
        return res.status(200).send({status:true,msg:"Otp verified"})
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
}

export default connectDb(handler)