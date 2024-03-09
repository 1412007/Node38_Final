import express from "express";
import rootRoutes from "./src/routes/rootRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(rootRoutes);

app.listen(8080, () => {
  console.log("BE starting with port 8080");
});
