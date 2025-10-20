import { Router } from "express";
import { login, logout, register, updateProfile } from "../controllers/userController.js";
import isAuthenticated from '../middleware/isAuthenticated.js'
import { singleUpload } from "../middleware/multer.js";

const route= Router();

route.post('/register',singleUpload,register);
route.post('/login',login);
route.post('/profile/update',isAuthenticated,singleUpload,updateProfile);
route.get('/logout',logout);



export default route;