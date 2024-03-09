import express from "express";
import {
  bookTicket,
  getShowtime,
  createShowtime,
} from "../controllers/ticketControllers.js";

const ticketRoutes = express.Router();

ticketRoutes.post("/DatVe", bookTicket);
ticketRoutes.get("/LayDanhSachPhongVe", getShowtime);
ticketRoutes.post("/TaoLichChieu", createShowtime);

export default ticketRoutes;
