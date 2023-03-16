import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import route from "./route/userRoute.js";

const PORT = process.env.PORT || 5000;

const URL =
  "mongodb+srv://rahul:Rahul@cluster0.0xffg.mongodb.net/AirBnb?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", route);

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

mongoose.connect(URL, (err) => {
  if (err) throw err;
  console.log("Your database is connected successfully.");
});

app.listen(PORT, () => {
  console.log(`app is served on http://localhost:${PORT}`);
});
