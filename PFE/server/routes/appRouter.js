import express from 'express';
import { userAuth } from '../middelware/userAuth.js';
import { applyJob ,getAppliedJobs,getApplicants,updateStatus } from '../controllers/applicationsController.js';

const appRouter = express.Router();
appRouter.post('/apply-job/:id',userAuth,applyJob);
appRouter.get('/applied-jobs',userAuth,getAppliedJobs);
appRouter.get('/:id/applicants',userAuth, getApplicants);
appRouter.post('/status/:id/update',userAuth, updateStatus);
export default appRouter;

