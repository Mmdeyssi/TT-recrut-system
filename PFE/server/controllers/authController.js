import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { transporter } from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE , WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../config/datauri.js";
//create user and send welcome email 
export const register = async(req,res)=>{

    try{
        //if i let role decalred as const i get  Assignment to constant variable error 
        const {fullName,email,password,age,phone,recruiterCode,role:originalRole} = req.body;
        let role=originalRole;
        if(!fullName || !email || !password || !age || !phone ||!role ){
            return res.json({succes:false,message:"Please fill in all fields"});
            
        }
        if(age<18) return res.json({succes:false,message:"You must be at least 18"})
            if (!req.file) {
                return res.json({ success: false, message: "Profile photo is required" });
            }            
            const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.json({succes:false,message:"Email already in use"});
        }
        if (recruiterCode) {
            if (recruiterCode === process.env.RECRUITER_CODE) {
              role = "employer";
            } else {
              return res.json({ success: false, message: "Invalid recruiter code" });
            }
          }
        const hashPassword = await bcrypt.hash(password,10);
        const user =new userModel({fullName,
            email,
            password :hashPassword,
            age,
            phone,
            role,
            recruiterCode: role === "employer" ? recruiterCode : null,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }        })
        await user.save();
        const token = jwt.sign({id:user._id , role: user.role }, process.env.JWT_SECRET , {expiresIn : '7d'});
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
            subject:"Your Smart Recruitment Assistant is Ready!",
            //text : `Welcome to TT recrut System , ${fullName} , you have been registered successfully with email : ${email}`
            html : WELCOME_EMAIL_TEMPLATE.replace("{{name}}",user.fullName)
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
        const token = jwt.sign({id:user._id, role: user.role }, process.env.JWT_SECRET , {expiresIn:'7d'})
        res.cookie('token' , token, {
            httpOnly: true,
            secure : process.env.NODE_ENV=== 'production', //secure when in production (use https)
            maxAge  : 7*24*60*60*1000, //en ms 
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
             
        }); 
        return res.json({succes:true,message:"Logged in successfully",user : user
        })

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
export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phone, bio, skills } = req.body;
        
        const formattedSkills = Array.isArray(skills) ? skills : skills.split(",").map(skill => skill.trim());
        const userId = req.user.id; // middleware authentication
        let user = await userModel.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullName) user.fullName = fullName
        if(email) user.email = email
        if(phone)  user.phone = phone
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = formattedSkills
        
        // resume comes later here...
        if (req.file) {
            user.profile.resume = `http://localhost:4000/${req.file.path}`;
            user.profile.resumeOriginalName = req.file.originalname;
           
          }
          


        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
//send verification OTP to the user's Email
export const sendVerifyOtp = async(req,res)=>{
    try{
        const userId=req.user.id;
        const user = await userModel.findById(userId);
        if(user.isVerified){
            return res.json({succes:false,message:"User is already verified"})
        }
        if (user.verifyOtp && user.otpExpireAt > Date.now()) {
            return res.json({ success: false, message: "OTP has already been sent. Please check your email or wait for it to expire." });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp=otp;
        user.otpExpireAt = Date.now()+10*60*1000// 10mins
        await user.save();

        const mailOption = {
            from:  process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Verify Your Email - Complete Your Registration',
            
            html : EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
            }
            await transporter.sendMail(mailOption);
            return res.json({succes:true,message:"OTP sent to your email"})
            

    }catch(err){
        res.json({succes:false,message:err.message})
    }
}
//verify the email using otp 
export const verifyEmail = async(req,res)=>{
    const {otp}=req.body;
    const userId = req.user.id;
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
        if (user.resetOtp && user.resetOtpExpireAt > Date.now()) {
            return res.json({ success: false, message: "OTP has already been sent. Please check your email or wait for it to expire." });
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
            html:PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)    
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

