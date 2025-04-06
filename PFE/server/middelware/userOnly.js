const userOnly = (req, res, next) => {
    if (req.user.role !== "jobSeeker") {
      return res.status(403).json({
        success: false,
        message: "Only users can access this route",
      });
    }
    next();
  };
  
export default userOnly
  