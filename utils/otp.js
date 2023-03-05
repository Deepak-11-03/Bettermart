import nodemailer from 'nodemailer'

const otpSender =async(otp, firstName, email)=> {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: "gmail",
        port: 587,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });

      let success = await transporter.sendMail({
        from: `'BetterMart' <process.env.USER>`,
        to: email,
        subject: "Verify your email",
        html: `<h3>Hlo ,${firstName}! Thanks for registering on our site </h3>
                        <h4>Please verify your otp ${otp}  to continue </h4>`,
      });
      if(success){
        return true
      }
    } catch (error) {
      return error
    }
};
export default otpSender;
