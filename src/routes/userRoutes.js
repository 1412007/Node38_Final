import express from "express";
import {
  getUserType,
  signUp,
  signIn,
  getAllUser,
  getAllUserWithPaging,
  getUser,
  searchUserWithPaging,
  getUserInfo,
  getUserInfoByEmail,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";

const userRoutes = express.Router();

/**
 * @swagger
 * tags:
 *    name: QuanLyNguoiDung
 *    description: API endpoints to manage Users
 * /QuanLyNguoiDung/LayDanhSachLoaiNguoiDung:
 *    get:
 *      summary: The list of user types
 *      tags: [QuanLyNguoiDung]
 *      responses:
 *        "200":
 *          description: a JSON array of user types
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/LoaiNguoiDung'
 */
userRoutes.get("/LayDanhSachLoaiNguoiDung", getUserType);

/**
 * @swagger
 * /QuanLyNguoiDung/DangNhap:
 *    post:
 *      summary: Sign in
 *      tags: [QuanLyNguoiDung]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Login successfully
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/NguoiDung'
 *        "401":
 *          description: Email/password is incorrect
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 */
userRoutes.post("/DangNhap", signIn);

/**
 * @swagger
 * /QuanLyNguoiDung/DangKy:
 *    post:
 *      summary: Sign up
 *      tags: [QuanLyNguoiDung]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                name:
 *                  type: string
 *                phone:
 *                  type: string
 *                userType:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Sign up successfully - return user's email
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/NguoiDung'
 *        "409":
 *          description: Email already existed
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 *        "400":
 *          description: Error when creating account
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 */
userRoutes.post("/DangKy", signUp);

/**
 * @swagger
 * /QuanLyNguoiDung/TimKiemNguoiDung:
 *    get:
 *      summary: Search user
 *      tags: [QuanLyNguoiDung]
 *      parameters:
 *        - in: query
 *          name: keyword
 *          schema:
 *            type: string
 *          description: search user by tai_khoan, ho_ten, or so_dt
 *      responses:
 *        "200":
 *          description: Return list of users match search keyword
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/NguoiDung'
 */
userRoutes.get("/TimKiemNguoiDung", getUser);

/**
 * @swagger
 * /QuanLyNguoiDung/TimKiemNguoiDungPhanTrang:
 *    get:
 *      summary: Search user with paging
 *      tags: [QuanLyNguoiDung]
 *      parameters:
 *        - in: query
 *          name: keyword
 *          schema:
 *            type: string
 *          description: search user by tai_khoan, ho_ten, or so_dt
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: page number
 *          required: true
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *          description: the total records per page
 *          required: true
 *      responses:
 *        "200":
 *          description: Return list of users match search keyword
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/NguoiDung'
 */
userRoutes.get("/TimKiemNguoiDungPhanTrang", searchUserWithPaging);

/**
 * @swagger
 * /QuanLyNguoiDung/LayDanhSachNguoiDung:
 *    get:
 *      summary: Get list of users
 *      tags: [QuanLyNguoiDung]
 *      responses:
 *        "200":
 *          description: Return list of users
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/NguoiDung'
 */
userRoutes.get("/LayDanhSachNguoiDung", getAllUser);

/**
 * @swagger
 * /QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang:
 *    get:
 *      summary: Get list of users with paging
 *      tags: [QuanLyNguoiDung]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: page number
 *          required: true
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *          description: the total records per page
 *          required: true
 *      responses:
 *        "200":
 *          description: Return list of users
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/NguoiDung'
 */
userRoutes.get("/LayDanhSachNguoiDungPhanTrang", getAllUserWithPaging);

/**
 * @swagger
 * /QuanLyNguoiDung/ThongTinTaiKhoan:
 *    post:
 *      summary: Get info of logged in user
 *      tags: [QuanLyNguoiDung]
 *      parameters:
 *        - in: header
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *        "200":
 *          description: Return user's info
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/NguoiDung'
 */
userRoutes.post("/ThongTinTaiKhoan", getUserInfo);

/**
 * @swagger
 * /QuanLyNguoiDung/LayThongTinNguoiDung:
 *    post:
 *      summary: Get info of user by email
 *      tags: [QuanLyNguoiDung]
 *      parameters:
 *        - in: header
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *        - in: query
 *          name: email
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *        "200":
 *          description: Return user's info
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/NguoiDung'
 *        "401":
 *          description: Unauthorized
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 */
userRoutes.post("/LayThongTinNguoiDung", getUserInfoByEmail);

/**
 * @swagger
 * /QuanLyNguoiDung/ThemNguoiDung:
 *    post:
 *      summary: Add user
 *      tags: [QuanLyNguoiDung]
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
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                name:
 *                  type: string
 *                phone:
 *                  type: string
 *                userType:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Add user successfully
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/NguoiDung'
 *        "401":
 *          description: Unauthorized
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 *        "409":
 *          description: Email already existed
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 *        "400":
 *          description: Error when adding user
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 */
userRoutes.post("/ThemNguoiDung", addUser);

/**
 * @swagger
 * /QuanLyNguoiDung/CapNhatThongTinNguoiDung:
 *    put:
 *      summary: Update user by email
 *      tags: [QuanLyNguoiDung]
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
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                name:
 *                  type: string
 *                phone:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Update user successfully
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/NguoiDung'
 *        "401":
 *          description: Unauthorized
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 *        "400":
 *          description: Invalid user's email
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 */
userRoutes.put("/CapNhatThongTinNguoiDung", updateUser);

/**
 * @swagger
 * /QuanLyNguoiDung/CapNhatThongTinNguoiDung:
 *    post:
 *      summary: Update user by email
 *      tags: [QuanLyNguoiDung]
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
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                name:
 *                  type: string
 *                phone:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Update user successfully
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/NguoiDung'
 *        "401":
 *          description: Unauthorized
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 *        "400":
 *          description: Invalid user's email
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 */
userRoutes.post("/CapNhatThongTinNguoiDung", updateUser);

/**
 * @swagger
 * /QuanLyNguoiDung/XoaNguoiDung:
 *    delete:
 *      summary: Delete user by email
 *      tags: [QuanLyNguoiDung]
 *      parameters:
 *        - in: header
 *          name: token
 *          schema:
 *            type: string
 *          required: true
 *        - in: query
 *          name: email
 *          schema:
 *            type: string
 *          required: true
 *      responses:
 *        "200":
 *          description: Delete user successfully
 *          contents:
 *            application/json:
 *              schema:
 *                type: array
 *                $ref: '#/components/schemas/NguoiDung'
 *        "401":
 *          description: Unauthorized
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 *        "400":
 *          description: Invalid user's email
 *          contents:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/NguoiDung'
 */
userRoutes.delete("/XoaNguoiDung", deleteUser);

export default userRoutes;
