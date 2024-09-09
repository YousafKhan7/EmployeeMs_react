import express from "express";
import cors from "cors";
const app = express();
import {adminRouter} from "./Routes/AdminRoute.js";

app.use(cors(
  {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
));
app.use(express.json());
app.use("/auth", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});