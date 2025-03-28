import { userModel } from "../models/userModel.js";

export const getUserData = async (req,res)=>{
    try {
        const userId = req.user.id ;
        const user = await userModel.findById(userId);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.json({
            succes : true,
            userData : {
                name : user.fullName,
                mail:user.email,
                phone:user.phone,
                isVerified : user.isVerified,
                role:user.role,
                userId:user._id,
                profile:user.profile,

            }
        });  
    }catch(err){
        res.status(500).json({message:err.message})
    }
}