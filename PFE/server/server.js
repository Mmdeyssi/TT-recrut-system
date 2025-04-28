
import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongodb.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import appRouter from "./routes/appRouter.js";



const app = express();
const port =process.env.PORT || 4000;
connectDB();
const allowed = ['http://localhost:5173']
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use("/uploads", express.static("uploads/cvs"));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: "Internal server error." });
  });
  
app.use(cookieParser());
app.use(cors({origin : allowed,credentials: true}));
//api endpoints
app.use('/api/auth',authRouter); 
app.use('/api/user',userRouter);
app.use('/api/jobs',jobRouter);
app.use('/api/application',appRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



app.listen(port,()=> console.log(`server started on Port :${port}`));
