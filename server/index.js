import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import indexRouter from "./Routes/index.js"

/* setting up server */
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

/* setting up routes */

// set up your routes here
app.use("api/", indexRouter);
