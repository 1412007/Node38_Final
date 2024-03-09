import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { checkToken } from "../config/jwt.js";
import { Op } from "@sequelize/core";
import { jwtDecode } from "jwt-decode";

const conn = initModels(sequelize);

const bookTicket = async (req, res) => {
  try {
    let { token } = req.headers;
    const decodedToken = jwtDecode(token);
    const { showTimes, arrTicket } = req.body;
    if (checkToken(token).statusCode == 200) {
      for (let i = 0; i < arrTicket.length; i++) {
        const data = await conn.datve.create({
          tai_khoan: decodedToken.data.user_id,
          ma_lich_chieu: showTimes,
          ma_ghe: arrTicket[i].chair,
        });
      }
      res.status(200).send("Book ticket successfully");
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getShowtime = async (req, res) => {
  try {
    const showTimes = req.query;
    const data = await conn.lichchieu.findAll({
      where: {
        ma_lich_chieu: showTimes.showtimes,
      },
    });
    if (data.length == 0) {
      res.status(400).send("Invalid request");
    } else {
      res.send(data);
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const createShowtime = async (req, res) => {
  try {
    let { token } = req.headers;
    const { movieId, dateTime, cinemaId, price } = req.body;
    if (checkToken(token).statusCode == 200) {
      const data = {
        ma_rap: cinemaId,
        ma_phim: movieId,
        ngay_gio_chieu: dateTime,
        gia_ve: price,
      };
      const create = await conn.lichchieu.create(data);
      if (!create) {
        res
          .status(400)
          .send(
            "There is an error when creating. Please try again after few minutes."
          );
      } else {
        res.status(200).send("Create successfully");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

export { bookTicket, getShowtime, createShowtime };
