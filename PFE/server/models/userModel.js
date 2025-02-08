import mongoose from "mongoose";
const userSchema=new mongoose.Schema({ 
    fullName:{type:String , required: true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    age:{type:Number,required:true},
    phone:{type:String,required:true},
    verifyOtp:{type:String,default:''},
    otpExpireAt:{type:String,default:0},
    isVerified:{type:Boolean,default:false},
    resetOtp:{type:String,default:''},
    resetOtpExpireAt:{type:String,default:0},


})
export const userModel=mongoose.model.user || mongoose.model('user',userSchema)
