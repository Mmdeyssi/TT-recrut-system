import express from 'express';
import { userAuth } from '../middelware/userAuth.js';
import { applyJob ,getAppliedJobs,getApplicants,updateStatus } from '../controllers/applicationsController.js';
import userOnly from '../middelware/userOnly.js';

const appRouter = express.Router();
appRouter.post('/apply-job/:id',userAuth,userOnly,applyJob);
appRouter.get('/applied-jobs',userAuth,userOnly,getAppliedJobs);
appRouter.get('/applicants/:jobId',userAuth, getApplicants);
appRouter.post('/status/:id/update',userAuth, updateStatus);
export default appRouter;

