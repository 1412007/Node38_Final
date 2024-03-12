import express from "express";
import {
  getCinema,
  getCinemaGroup,
  getShowtimeByCinema,
  getShowtime,
} from "../controllers/cinemaControllers.js";

const cinemaRoutes = express.Router();

/**
 * @swagger
 * tags:
 *    name: QuanLyRap
 *    description: API endpoints to manage Cinemas
 * /QuanLyRap/LayThongTinHeThongRap:
 *    get:
 *      summary: Get list of cinemas
 *      tags: [QuanLyRap]
 *      parameters:
 *        - in: query
 *          name: cinemaId
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: List of cinema
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/HeThongRap'
 */
cinemaRoutes.get("/LayThongTinHeThongRap", getCinema);

/**
 * @swagger
 * /QuanLyRap/LayThongTinCumRapTheoHeThong:
 *    get:
 *      summary: Get list of group cinemas
 *      tags: [QuanLyRap]
 *      parameters:
 *        - in: query
 *          name: cinemaId
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: List of group cinema
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/CumRap'
 *        "400":
 *          description: Bad request
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CumRap'
 */
cinemaRoutes.get("/LayThongTinCumRapTheoHeThong", getCinemaGroup);

/**
 * @swagger
 * /QuanLyRap/LayThongTinLichChieuHeThongRap:
 *    get:
 *      summary: Get showtime
 *      tags: [QuanLyRap]
 *      parameters:
 *        - in: query
 *          name: cinemaId
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: List of showtimes
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/LichChieu'
 *        "400":
 *          description: Bad request
 */
cinemaRoutes.get("/LayThongTinLichChieuHeThongRap", getShowtimeByCinema);

/**
 * @swagger
 * /QuanLyRap/LayThongTinLichChieuPhim:
 *    get:
 *      summary: Get showtime
 *      tags: [QuanLyRap]
 *      parameters:
 *        - in: query
 *          name: movieId
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: List of showtimes
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/LichChieu'
 *        "400":
 *          description: Bad request
 */
cinemaRoutes.get("/LayThongTinLichChieuPhim", getShowtime);

export default cinemaRoutes;
