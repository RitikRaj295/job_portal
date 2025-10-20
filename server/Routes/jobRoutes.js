import { Router } from "express";
import isAuthenticated from '../middleware/isAuthenticated.js'
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/jobController.js";

const route= Router();

route.post('/post',isAuthenticated,postJob);
route.get('/get',isAuthenticated,getAllJobs);
route.get('/getadminjobs',isAuthenticated,getAdminJobs);
route.get('/get/:id',getJobById);



export default route;