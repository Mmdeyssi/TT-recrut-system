
import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongodb.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import applicationsRouter from "./routes/jobApplicationsRoutes.js";


const app = express();
const port =process.env.PORT || 4000;
connectDB();
const allowed = ['http://localhost:5173']
app.use(express.json());
app.use("/uploads", express.static("uploads/cvs"));

app.use(cookieParser());
app.use(cors({origin : allowed,credentials: true}));
//api endpoints
app.use('/api/auth',authRouter); 
app.use('/api/user',userRouter);
app.use('/api/jobs',jobRouter)
app.use('/api/applications',applicationsRouter)


app.listen(port,()=> console.log(`server started on Port :${port}`));
