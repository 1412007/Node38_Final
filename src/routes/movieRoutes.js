import express from "express";
import {
  getAllBanner,
  getMovie,
  getMovieWithPaging,
  getMovieByDay,
  deleteMovie,
  getMovieInfo,
} from "../controllers/movieControllers.js";

const movieRoutes = express.Router();

movieRoutes.get("/LayDanhSachBanner", getAllBanner);
movieRoutes.get("/LayDanhSachPhim", getMovie);
movieRoutes.get("/LayDanhSachPhimPhanTrang", getMovieWithPaging);
movieRoutes.get("/LayDanhSachPhimTheoNgay", getMovieByDay);
movieRoutes.delete("/XP", deleteMovie);
movieRoutes.delete("/XoaPhim", deleteMovie);
movieRoutes.get("/LayThongTinPhim", getMovieInfo);

export default movieRoutes;
