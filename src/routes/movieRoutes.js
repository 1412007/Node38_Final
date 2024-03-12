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

/**
 * @swagger
 * tags:
 *    name: QuanLyPhim
 *    description: API endpoints to manage Movies
 * /QuanLyPhim/LayDanhSachBanner:
 *    get:
 *      summary: Get movie's banner
 *      tags: [QuanLyPhim]
 *      responses:
 *        "200":
 *          description: List of movie's banner
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/Banner'
 */
movieRoutes.get("/LayDanhSachBanner", getAllBanner);

/**
 * @swagger
 * /QuanLyPhim/LayDanhSachPhim:
 *    get:
 *      summary: Get list of movies
 *      tags: [QuanLyPhim]
 *      parameters:
 *        - in: query
 *          name: keyword
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: List of movies
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/Phim'
 */
movieRoutes.get("/LayDanhSachPhim", getMovie);

/**
 * @swagger
 * /QuanLyPhim/LayDanhSachPhimPhanTrang:
 *    get:
 *      summary: Get list of movies with paging
 *      tags: [QuanLyPhim]
 *      parameters:
 *        - in: query
 *          name: keyword
 *          schema:
 *            type: string
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          required: true
 *          description: page number
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *          required: true
 *          description: the total records per page
 *      responses:
 *        "200":
 *          description: List of movies
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/Phim'
 */
movieRoutes.get("/LayDanhSachPhimPhanTrang", getMovieWithPaging);

/**
 * @swagger
 * /QuanLyPhim/LayDanhSachPhimTheoNgay:
 *    get:
 *      summary: Get list of movies by day
 *      tags: [QuanLyPhim]
 *      parameters:
 *        - in: query
 *          name: keyword
 *          schema:
 *            type: string
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          required: true
 *          description: page number
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *          required: true
 *          description: the total records per page
 *        - in: query
 *          name: from
 *          schema:
 *            type: string
 *          required: true
 *          description: the start date
 *        - in: query
 *          name: to
 *          schema:
 *            type: string
 *          required: true
 *          description: the end date
 *      responses:
 *        "200":
 *          description: List of movies
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/Phim'
 */
movieRoutes.get("/LayDanhSachPhimTheoNgay", getMovieByDay);

/**
 * @swagger
 * /QuanLyPhim/XP:
 *    delete:
 *      summary: Delete movies
 *      tags: [QuanLyPhim]
 *      parameters:
 *        - in: header
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *        - in: query
 *          name: movieId
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        "200":
 *          description: Delete successfully
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/Phim'
 *        "400":
 *          description: Invalid movie id
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Phim'
 *        "401":
 *          description: Unauthorized
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 */
movieRoutes.delete("/XP", deleteMovie);

/**
 * @swagger
 * /QuanLyPhim/XoaPhim:
 *    delete:
 *      summary: Delete movies
 *      tags: [QuanLyPhim]
 *      parameters:
 *        - in: header
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *        - in: query
 *          name: movieId
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        "200":
 *          description: Delete successfully
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/Phim'
 *        "400":
 *          description: Invalid movie id
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Phim'
 *        "401":
 *          description: Unauthorized
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 */
movieRoutes.delete("/XoaPhim", deleteMovie);

/**
 * @swagger
 * /QuanLyPhim/LayThongTinPhim:
 *    get:
 *      summary: Get movie's info
 *      tags: [QuanLyPhim]
 *      parameters:
 *        - in: query
 *          name: movieId
 *          schema:
 *            type: integer
 *          required: true
 *      responses:
 *        "200":
 *          description: Movie's info
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/Phim'
 *        "400":
 *          description: Invalid movie id
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Phim'
 */
movieRoutes.get("/LayThongTinPhim", getMovieInfo);

export default movieRoutes;
