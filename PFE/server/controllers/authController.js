import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { transporter } from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";
//create user and send welcome email 
export const register = async(req,res)=>{
    const {fullName,email,password,age,phone} = req.body;
    if(!fullName || !email || !password || !age || !phone){
        return res.json({succes:false,message:"Please fill in all fields"});
        
    }
    if(age<18) return res.json({succes:false,message:"You must be at least 18"})
    try{
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.json({succes:false,message:"Email already in use"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user =new userModel({fullName,email,password :hashPassword,age,phone})
        await user.save();
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET , {expiresIn : '7d'});
        res.cookie('token' , token, {
            httpOnly: true,
            secure : true, 
            maxAge  : 7*24*60*60*1000, //en ms 
            sameSite: "None"

             
        });
        //sending welcome email
      const mailOption = {
            from: process.env.SENDER_EMAIL,
            to : email,
            subject:'Welcome to TT recrut System',
            text : `Welcome to TT recrut System , ${fullName} , you have been registered successfully with email : ${email}`
        }
        await transporter.sendMail(mailOption);
        return res.json({succes:true,message:"Succesfull Registration"})

    }catch(err){
        res.json({succes:false,message:err.message})

    }

}
export const login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({succes:false,message:"Email and Password are required"})
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({succes:false,message:"Invalid Email"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({succes:false,message:"Invalid Password"})
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET , {expiresIn:'7d'})
        res.cookie('token' , token, {
            httpOnly: true,
            secure : process.env.NODE_ENV=== 'production', //secure when in production (use https)
            maxAge  : 7*24*60*60*1000, //en ms 
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
             
        });
        return res.json({succes:true,message:"Logged in successfully"})

    }catch(err){
        res.json({succes:false,message:"err.message"})
    }
}
export const logOut = async(req,res)=>{
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',

        })
        return res.json({succes:true,message:"Logged out successfully"})

    }catch(err){
        res.json({succes:false,message:err.message})
    }
}
//explanation 1h56
export const isAuthenticated =async(req,res)=>{
    try {
        return res.json({success:true});

    }catch(err){
        res.json({succes:false,message:err.message})
    }
}
//send verification OTP to the user's Email
export const sendVerifyOtp = async(req,res)=>{
    try{
        const{userId}=req.body;
        const user = await userModel.findById(userId);
        if(user.isVerified){
            return res.json({succes:false,message:"User is already verified"})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp=otp;
        user.otpExpireAt = Date.now()+24*60*60*1000 // 24hrs
        await user.save();

        const mailOption = {
            from:  process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Verify your Email',
            //text: `Your OTP is ${otp} . Verify your account using this otp`,
            html : EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",email)
            }
            await transporter.sendMail(mailOption);
            return res.json({succes:true,message:"OTP sent to your email"})
            

    }catch(err){
        res.json({succes:false,message:err.message})
    }
}
//verify the email using otp 
export const verifyEmail = async(req,res)=>{
    const {userId,otp}=req.body;
    if(!userId || !otp){
        return res.json({succes:false,message:"Missing Details"})

    }try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({succes:false,message:"User not found"})
        }
        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.json({succes:false,message:"Invalid OTP"})
        }
        if(user.otpExpireAt < Date.now()){
            return res.json({succes:false,message:"OTP expired"})
        }
        user.isVerified = true;
        //reinitialisation des parametres apres verification
        user.verifyOtp = '';
        user.otpExpireAt = 0;
        await user.save();
        return res.json({succes:true,message:"User verified successfully"})
    }catch(err){
        res.json({succes:false,message:err.message})
    }
}
//send password reset otp 
export const sendResetOtp = async(req,res)=>{
    const {email}  = req.body;
    if(!email){
        return res.json({succes:false,message:"Email is Required"})
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({succes:false,message:"User not found"})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp=otp;
        user.resetOtpExpireAt = Date.now()+ 10*60*1000 // 10 mins
        await user.save();
        const mailOption = {
            from:  process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
           // text: `Your OTP for resetting your password is ${otp}.`
            html:PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",email)    
        }
            await transporter.sendMail(mailOption);
            return res.json({succes:true,message:"OTP sent to your email"})
        


    }catch(err){
        res.json({succes:false,message:err.message})

    }


}
//Reset user password
export const resetPassword = async(req,res)=>{
    const {email , otp , newPassword} = req.body;
    if(!email || !otp || !newPassword){
        return res.json({succes:false,message:"All fields are required"})
    }
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({succes:false,message:"User not found"})
        }
        if(user.resetOtp !== otp || user.resetOtp === ""){
            return res.json({succes:false,message:"Invalid OTP"})
        }
        if(user.resetOtpExpireAt < Date.now()){
            return res.json({succes:false,message:"OTP has expired"})
        }
        const hashedPassword = await bcrypt.hash(newPassword,10)
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;
        await user.save();
        return res.json({succes:true,message:"Password has been reset successfully"})
    
    }catch(err){
        res.json({succes:false,message:err.message})
    }    
}

