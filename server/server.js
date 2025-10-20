import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./Routes/userRoutes.js";
import companyRoutes from "./Routes/companyRoutes.js";
import jobRoutes from "./Routes/jobRoutes.js"
import applicationRoutes from './Routes/applicationRoutes.js'
import connectDb from "./config/db.js";
dotenv.config({});

const app = express();
const port = process.env.port || 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use("/api/users",userRoutes);
app.use("/api/company",companyRoutes);
app.use("/api/jobs",jobRoutes);
app.use("/api/application",applicationRoutes)




app.get("/", (req, res) => {
  res.send("api working!");
});

app.listen(port, () => {
  connectDb();
  console.log(`server is listening on port ${port}`);
});
