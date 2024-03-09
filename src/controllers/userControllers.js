import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcrypt from "bcrypt";
import { generateToken, checkToken } from "../config/jwt.js";
import { Op } from "@sequelize/core";
import { jwtDecode } from "jwt-decode";

const conn = initModels(sequelize);

const getUserType = async (req, res) => {
  try {
    const data = await conn.loainguoidung.findAll();
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const signUp = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const existingEmail = await conn.nguoidung.findOne({
      where: { email: `${email}` },
    });
    if (existingEmail) {
      res.status(409).send("Email already existed");
    } else {
      const hashPassword = bcrypt.hashSync(req.body.password, 15);
      const user = {
        email: email,
        mat_khau: hashPassword,
        ho_ten: req.body.name,
        so_dt: req.body.phone,
        loai_nguoi_dung: req.body.userType,
      };
      const createUser = await conn.nguoidung.create(user);
      if (!createUser) {
        return res
          .status(400)
          .send(
            "There is an error when creating account. Please try again after few minutes."
          );
      }
      res.send(email);
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const signIn = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const user = await conn.nguoidung.findOne({
      where: { email: `${email}` },
    });

    if (!user) {
      res.status(401).send("Email is incorrect");
    }
    const isValidPassword = bcrypt.compareSync(password, user.mat_khau);
    if (!isValidPassword) {
      res.status(401).send("Password is incorrect");
    }

    let payload = {
      user_id: user.tai_khoan,
    };
    let token = generateToken(payload);
    res.status(200).send(token);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getAllUser = async (req, res) => {
  try {
    const data = await conn.nguoidung.findAll({
      attributes: ["tai_khoan", "email", "ho_ten", "so_dt", "loai_nguoi_dung"],
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getAllUserWithPaging = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;
    const data = await conn.nguoidung.findAll({
      attributes: ["tai_khoan", "email", "ho_ten", "so_dt", "loai_nguoi_dung"],
      offset: offset,
      limit: limit * 1,
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getUser = async (req, res) => {
  try {
    const keyword = req.query;
    const data = await conn.nguoidung.findAll({
      attributes: ["tai_khoan", "email", "ho_ten", "so_dt", "loai_nguoi_dung"],
      where: {
        [Op.or]: [
          {
            ho_ten: {
              [Op.like]: `%${keyword.keyword}%`,
            },
          },
          {
            tai_khoan: {
              [Op.like]: `%${keyword.keyword}%`,
            },
          },
          {
            so_dt: {
              [Op.like]: `%${keyword.keyword}%`,
            },
          },
        ],
      },
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const searchUserWithPaging = async (req, res) => {
  try {
    const { keyword, page, limit } = req.query;
    const offset = (page - 1) * limit;
    const data = await conn.nguoidung.findAll({
      attributes: ["tai_khoan", "email", "ho_ten", "so_dt", "loai_nguoi_dung"],
      where: {
        [Op.or]: [
          {
            ho_ten: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            tai_khoan: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            so_dt: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
      offset: offset,
      limit: 1 * limit,
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getUserInfo = async (req, res) => {
  try {
    let { token } = req.headers;
    const decodedToken = jwtDecode(token);
    const data = await conn.nguoidung.findOne({
      attributes: ["tai_khoan", "email", "ho_ten", "so_dt", "loai_nguoi_dung"],
      where: {
        tai_khoan: decodedToken.data.user_id,
      },
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const addUser = async (req, res) => {
  try {
    let { token } = req.headers;
    const email = req.body.email.toLowerCase();
    if (checkToken(token).statusCode == 200) {
      const existingEmail = await conn.nguoidung.findOne({
        where: { email: `${email}` },
      });
      if (existingEmail) {
        res.status(409).send("Email already existed");
      } else {
        const hashPassword = bcrypt.hashSync(req.body.password, 15);
        const user = {
          email: email,
          mat_khau: hashPassword,
          ho_ten: req.body.name,
          so_dt: req.body.phone,
          loai_nguoi_dung: req.body.userType,
        };
        const createUser = await conn.nguoidung.create(user);
        if (!createUser) {
          return res
            .status(400)
            .send(
              "There is an error when creating account. Please try again after few minutes."
            );
        }
        res.send(email);
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const updateUser = async (req, res) => {
  try {
    let { token } = req.headers;
    const { email, password, name, phone } = req.body;
    if (checkToken(token).statusCode == 200) {
      const user = await conn.nguoidung.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        res.status(400).send("Invalid user");
      } else {
        if (password) {
          const hashPassword = bcrypt.hashSync(password, 15);
          user.update({ mat_khau: hashPassword });
          user.save();
        }
        if (name) {
          user.update({ ho_ten: name });
          user.save();
        }
        if (phone) {
          user.update({ so_dt: phone });
          user.save();
        }
        res.status(200).send("Update successfully");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const deleteUser = async (req, res) => {
  try {
    let { token } = req.headers;
    if (checkToken(token).statusCode == 200) {
      const user = await conn.nguoidung.findOne({
        where: {
          email: req.query.email,
        },
      });
      if (!user) {
        res.status(400).send("Invalid user");
      } else {
        user.destroy();
        user.save();
      }
      res.status(200).send("Delete successfully");
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

export {
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
};
