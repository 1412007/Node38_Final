import express from "express";
import userRoutes from "./userRoutes.js";
import ticketRoutes from "./ticketRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/QuanLyNguoiDung", userRoutes);
rootRoutes.use("/QuanLyDatVe", ticketRoutes);

export default rootRoutes;
