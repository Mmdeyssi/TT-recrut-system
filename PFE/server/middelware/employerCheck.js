const employerCheck = (req, res, next) => {
    try {
      // Check if user exists in request (from previous auth middleware)
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      // Check if user has employer role
      if (req.user.role !== "employer") {
        console.log(req.user.role)
        return res.status(403).json({ 
          message: "Forbidden: Employer privileges required" 
        });
      }
  
      // If checks pass, continue to next middleware/controller
      next();
    } catch (error) {
      console.error("Employer check error:", error);
      res.status(500).json({ message: "Server error during authorization" });
    }
  };
  
  export default employerCheck;