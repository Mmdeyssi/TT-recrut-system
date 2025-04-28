import express from 'express';

import { userAuth } from "../middelware/userAuth.js";
import employerCheck from '../middelware/employerCheck.js';
import { addJob, deleteJob, editJob, getAdminJobs, getAllJobs, getJobById, getJobs } from '../controllers/jobController.js';
const jobRouter = express.Router();
jobRouter.post("/add-job", userAuth,employerCheck, addJob); // Only employers can post jobs
jobRouter.get("/all-jobs", getJobs); // Anyone can view all jobs
jobRouter.get("/search-job",getAllJobs);
jobRouter.get("/search-job/:id",getJobById)
jobRouter.get("/admin-jobs",userAuth,employerCheck,getAdminJobs)
jobRouter.put("/edit-job/:jobId",userAuth,employerCheck,editJob)
jobRouter.delete("/delete/:jobId", userAuth,employerCheck, deleteJob);//only employer can delete a job
export default jobRouter;