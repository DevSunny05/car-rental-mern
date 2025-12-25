import expresss from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";

const app = expresss();

// config
dotenv.config();
connectDB();

app.use(cors());
app.use(expresss.json());
app.use(morgan("dev"));



app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to our server</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `we are listening on port ${PORT} in ${process.env.DEV_MODE}`.bgBlue.white
  );
});
