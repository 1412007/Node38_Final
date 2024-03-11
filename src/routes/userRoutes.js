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
userRoutes.get("/TimKiemNguoiDung", getUser);
userRoutes.get("/TimKiemNguoiDungPhanTrang", searchUserWithPaging);
userRoutes.get("/LayDanhSachNguoiDung", getAllUser);
userRoutes.get("/LayDanhSachNguoiDungPhanTrang", getAllUserWithPaging);
userRoutes.post("/ThongTinTaiKhoan", getUserInfo);
userRoutes.post("/LayThongTinNguoiDung", getUserInfoByEmail);
userRoutes.post("/ThemNguoiDung", addUser);
userRoutes.put("/CapNhatThongTinNguoiDung", updateUser);
userRoutes.post("/CapNhatThongTinNguoiDung", updateUser);
userRoutes.delete("/XoaNguoiDung", deleteUser);

export default userRoutes;
