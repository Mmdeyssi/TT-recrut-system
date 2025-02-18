import express from 'express';
import { addJob, deleteJob, getAllJobs } from "../controllers/jobApplicationController.js";
import { userAuth } from "../middelware/userAuth.js";
const jobRouter = express.Router();
jobRouter.post("/add-job", userAuth, addJob); // Only employers can post jobs
jobRouter.get("/all-jobs", getAllJobs); // Anyone can view all jobs
jobRouter.delete("/:jobId", userAuth, deleteJob);//only employer can delete a job
export default jobRouter;