import express from "express";
import {
  bookTicket,
  getShowtime,
  createShowtime,
} from "../controllers/ticketControllers.js";

const ticketRoutes = express.Router();

/**
 * @swagger
 * tags:
 *    name: QuanLyDatVe
 *    description: API endpoints to manage Ticket
 * /QuanLyDatVe/DatVe:
 *    post:
 *      summary: Book a movie ticket
 *      tags: [QuanLyDatVe]
 *      parameters:
 *        - in: header
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                showTimes:
 *                  type: integer
 *                arrTicket:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      chair:
 *                        type: integer
 *                      price:
 *                        type: integer
 *      responses:
 *        "200":
 *          description: Book ticket successfully
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/DatVe'
 *        "401":
 *          description: Unauthorized
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 */
ticketRoutes.post("/DatVe", bookTicket);

/**
 * @swagger
 * /QuanLyDatVe/LayDanhSachPhongVe:
 *    get:
 *      summary: Get a list of movie tickets
 *      tags: [QuanLyDatVe]
 *      parameters:
 *        - in: query
 *          name: showtimes
 *          schema:
 *            type: integer
 *      responses:
 *        "200":
 *          description: List of movie tickets
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/LichChieu'
 */
ticketRoutes.get("/LayDanhSachPhongVe", getShowtime);

/**
 * @swagger
 * /QuanLyDatVe/TaoLichChieu:
 *    post:
 *      summary: Create
 *      tags: [QuanLyDatVe]
 *      parameters:
 *        - in: header
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                cinemaId:
 *                  type: integer
 *                movieId:
 *                  type: integer
 *                dateTime:
 *                  type: string
 *                price:
 *                  type: integer
 *      responses:
 *        "200":
 *          description: Create successfully
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/LichChieu'
 *        "401":
 *          description: Unauthorized
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 *        "400":
 *          description: Error when creating
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LichChieu'
 */
ticketRoutes.post("/TaoLichChieu", createShowtime);

export default ticketRoutes;
