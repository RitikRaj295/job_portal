import { Router } from "express";
import isAuthenticated from '../middleware/isAuthenticated.js'
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js";
import { singleUpload } from "../middleware/multer.js";

const route= Router();

route.post('/register',isAuthenticated,registerCompany);
route.get('/get',isAuthenticated,getCompany);
route.get('/get/:id',isAuthenticated,getCompanyById);
route.put('/update/:id',isAuthenticated,singleUpload,updateCompany);



export default route;