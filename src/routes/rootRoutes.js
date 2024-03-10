import express from "express";
import userRoutes from "./userRoutes.js";
import ticketRoutes from "./ticketRoutes.js";
import movieRoutes from "./movieRoutes.js";
import cinemaRoutes from "./cinemaRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use("/QuanLyNguoiDung", userRoutes);
rootRoutes.use("/QuanLyDatVe", ticketRoutes);
rootRoutes.use("/QuanLyPhim", movieRoutes);
rootRoutes.use("/QuanLyRap", cinemaRoutes);

export default rootRoutes;
