import express from "express";
import { applyForJob, getJobApplications, getUserApplications } from "../controllers/jobApplicationController.js";
import { userAuth } from "../middelware/userAuth.js";
import { upload } from "../middelware/upload.js";
const applicationsRouter = express.Router();
applicationsRouter.post("/applications/apply", userAuth, upload.single("cv"), applyForJob); // Apply for a job
applicationsRouter.get("/applications/job/:jobId", userAuth, getJobApplications); // Get all applications for a job
applicationsRouter.get("/applications/user", userAuth, getUserApplications); // Get all jobs a user applied for
export default applicationsRouter