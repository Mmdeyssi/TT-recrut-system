import express from "express";
import { applyForJob, getJobApplications, getUserApplications } from "../controllers/jobApplicationController.js";
import { userAuth } from "../middelware/userAuth.js";
import { upload } from "../middelware/upload.js";
const applicationsRouter = express.Router();
applicationsRouter.post("/apply", userAuth, upload.single("cv"), applyForJob); // Apply for a job
applicationsRouter.get("/job/:jobId", userAuth, getJobApplications); // Get all applications for a job
applicationsRouter.get("/user", userAuth, getUserApplications); // Get all jobs a user applied for
export default applicationsRouter