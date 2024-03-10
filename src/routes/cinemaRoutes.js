import express from "express";
import {
  getCinema,
  getCinemaGroup,
  getShowtimeByCinema,
  getShowtime,
} from "../controllers/cinemaControllers.js";

const cinemaRoutes = express.Router();

cinemaRoutes.get("/LayThongTinHeThongRap", getCinema);
cinemaRoutes.get("/LayThongTinCumRapTheoHeThong", getCinemaGroup);
cinemaRoutes.get("/LayThongTinLichChieuHeThongRap", getShowtimeByCinema);
cinemaRoutes.get("/LayThongTinLichChieuPhim", getShowtime);

export default cinemaRoutes;
