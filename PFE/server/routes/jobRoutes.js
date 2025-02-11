import express from 'express';
import { addJob, getAllJobs } from "../controllers/jobApplicationController.js";
import { userAuth } from "../middelware/userAuth.js";
const jobRouter = express.Router();
jobRouter.post("/add-job", userAuth, addJob); // Only employers can post jobs
jobRouter.get("/all-jobs", getAllJobs); // Anyone can view all jobs
export default jobRouter;