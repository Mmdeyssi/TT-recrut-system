import express from 'express';
import { addJob, deleteJob, getAllJobs } from "../controllers/jobApplicationController.js";
import { userAuth } from "../middelware/userAuth.js";
import employerCheck from '../middelware/employerCheck.js';
const jobRouter = express.Router();
jobRouter.post("/add-job", userAuth,employerCheck, addJob); // Only employers can post jobs
jobRouter.get("/all-jobs", getAllJobs); // Anyone can view all jobs
jobRouter.delete("/:jobId", userAuth,employerCheck, deleteJob);//only employer can delete a job
export default jobRouter;