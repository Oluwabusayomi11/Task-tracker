import express from "express";
import cors from "cors";
import { userRouter } from "./routes/userRoute.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", userRouter);

app.listen(5000, () => {
  console.log("Server is running");
});
