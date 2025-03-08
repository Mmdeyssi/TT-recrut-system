import jwt from "jsonwebtoken";

// Middleware to authenticate user and get id and role from token
export const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ msg: "Not Authorized. Please log in again." });

    try {
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Check if both id and role are in the token
        if (tokenDecoded.id && tokenDecoded.role) {
            req.user = { id: tokenDecoded.id, role: tokenDecoded.role };
        } else {
            return res.status(401).json({ msg: "Not Authorized. Invalid token." });
        }
        
        next();
    } catch (err) {
        return res.status(500).json({ msg: "Server Error" });
    }
};

// Now you can access both id and role in your route handlers like this:
// console.log(req.user.id, req.user.role);
