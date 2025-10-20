import { Router } from "express";
import isAuthenticated from '../middleware/isAuthenticated.js'
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/applicationContoller.js";

const route= Router();

route.get('/apply/:id',isAuthenticated,applyJob);
route.get('/get',isAuthenticated,getAppliedJobs);
route.get('/:id/applicants',isAuthenticated,getApplicants);
route.post('/status/:id/update',isAuthenticated,updateStatus);



export default route;