import express from 'express';
import { userAuth } from '../middelware/userAuth.js';
import { applyJob ,getAppliedJobs,getApplicants,updateStatus } from '../controllers/applicationsController.js';
import userOnly from '../middelware/userOnly.js';

import { extractPdfText, resumeUpload, upload} from '../middelware/upload.js';

const appRouter = express.Router();
appRouter.post('/apply-job/:id',userAuth,userOnly,resumeUpload.single("resume"),extractPdfText, applyJob);
appRouter.get('/applied-jobs',userAuth,userOnly,getAppliedJobs);
appRouter.get('/applicants/:jobId',userAuth, getApplicants);
appRouter.post('/status/:id/update',userAuth, updateStatus);
//appRouter.post("/match-resume", userAuth, upload.single("resume"), extractPdfText, matchResumeToJob);


export default appRouter;

