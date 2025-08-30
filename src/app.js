import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors";

export const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true

}))

app.use(express.json({limit : "20kb"}))
app.use(express.urlencoded({extended : true , limit : "20kb"}))
app.use(cookieParser())

// routes import 

import userRouter from "./routes/user.routes.js"
import doctorRouter from "./routes/doctor.routes.js"
import appointmentRouter from "./routes/appointment.routes.js"
import feedbackRouter from "./routes/feedback.routes.js"

// routes declaration

app.use("/api/v1/users",userRouter);
app.use("/api/v1/doctors",doctorRouter);
app.use("/api/v1/appointments",appointmentRouter);
app.use("/api/v1/feedbacks",feedbackRouter);
