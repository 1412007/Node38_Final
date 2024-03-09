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
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.get("/LayDanhSachLoaiNguoiDung", getUserType);
userRoutes.post("/DangNhap", signIn);
userRoutes.post("/DangKy", signUp);
userRoutes.get("/TimKiemNguoiDung", getUser);
userRoutes.get("/TimKiemNguoiDungPhanTrang", searchUserWithPaging);
userRoutes.get("/LayDanhSachNguoiDung", getAllUser);
userRoutes.get("/LayDanhSachNguoiDungPhanTrang", getAllUserWithPaging);
userRoutes.post("/LayThongTinNguoiDung", getUserInfo);
userRoutes.post("/ThemNguoiDung", addUser);
userRoutes.put("/CapNhatThongTinNguoiDung", updateUser);
userRoutes.post("/CapNhatThongTinNguoiDung", updateUser);
userRoutes.delete("/XoaNguoiDung", deleteUser);

export default userRoutes;
