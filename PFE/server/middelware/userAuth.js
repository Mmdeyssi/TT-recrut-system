import jwt from "jsonwebtoken";
//to get the user id from the token because the token is made from the user id 
export const userAuth = async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token) return res.status(401).json({msg:"Not Authorized Login Again"});
    try{
        const tokenDecoded = jwt.verify(token , process.env.JWT_SECRET);
        if(tokenDecoded.id){
            req.body.userId = tokenDecoded.id;
        }else{
            return res.status(401).json({msg:"Not Authorized Login Again"});
        }
        const user = await UserModel.findById(tokenDecoded.id).select("-password"); // Exclude password for security
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
    
        req.user = user; // Attach user data to `req.user`
        next();

     }catch(err){
        return res.status(500).json({msg:"Server Error"});
     }  
}