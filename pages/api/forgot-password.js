import connectDb from "../../utils/dbConnect";
import userSchema from "../../models/userModel";
import crypto from 'node:crypto';
import otpSender from "../../utils/otp";


const handler = async(req,res)=>{
    try {
        let {email} = req.body;
        const timeOutId = setTimeout(() => {
            return res.status(500).send({ status: false, msg: "something wrong" });
        }, 5000);

        const user  = await userSchema.findOne({email})
        clearTimeout(timeOutId);
        if(!user){
            return res.status(404).send({status:false,msg:"No user found with this email"})
        }

        const otpToken =  Math.floor(100000 + Math.random() * 900000);
        const otpSendSuccessfully = otpSender(otpToken,user.firstName,user.email)

        if(!otpSendSuccessfully){
            return res.status(400).send({status:false,msg:"something wrong please try later"})
        }
        user.otpToken = otpToken
        user.save();
        return res.status(200).send({status:true,msg:"Otp has been sent to your email"})
    } catch (error) {
        return res.status(500).send({ msg: error.message });
    }
}

export default connectDb(handler)