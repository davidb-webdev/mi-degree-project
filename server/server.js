import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const serverPort = process.env.SERVER_PORT || "3000";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server response");
});

app.listen(serverPort, () => console.log("Node server running"));
