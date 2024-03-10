import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import { Op } from "@sequelize/core";
import { checkToken } from "../config/jwt.js";

const conn = initModels(sequelize);

const getAllBanner = async (req, res) => {
  try {
    const data = await conn.banner.findAll();
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getMovie = async (req, res) => {
  try {
    const movieName = req.query.keyword;
    if (movieName) {
      const data = await conn.phim.findAll({
        where: {
          ten_phim: {
            [Op.like]: `%${movieName}%`,
          },
        },
      });
      res.send(data);
    } else {
      const data = await conn.phim.findAll();
      res.send(data);
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getMovieWithPaging = async (req, res) => {
  try {
    const { page, limit, keyword } = req.query;
    const offset = (page - 1) * limit;
    console.log(offset, page, limit);
    if (keyword) {
      const data = await conn.phim.findAll({
        where: {
          ten_phim: {
            [Op.like]: `%${keyword}%`,
          },
        },
        offset: offset,
        limit: limit * 1,
      });
      res.send(data);
    } else {
      const data = await conn.phim.findAll({
        offset: offset,
        limit: limit * 1,
      });
      res.send(data);
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getMovieByDay = async (req, res) => {
  try {
    const { page, limit, from, to } = req.query;
    const offset = (page - 1) * limit;
    const data = await conn.phim.findAll({
      where: {
        ngay_khoi_chieu: { [Op.between]: [from, to] },
      },
      offset: offset,
      limit: limit * 1,
    });
    res.send(data);
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const deleteMovie = async (req, res) => {
  try {
    let { token } = req.headers;
    if (checkToken(token).statusCode == 200) {
      const { movieId } = req.query;
      const movie = await conn.phim.findOne({
        where: {
          ma_phim: movieId,
        },
      });
      if (movie) {
        await conn.banner.destroy({
          where: {
            ma_phim: movieId,
          },
        });
        await conn.lichchieu.destroy({
          where: {
            ma_phim: movieId,
          },
        });
        movie.destroy();
        movie.save();
        res.status(200).send("Delete successfully");
      } else {
        res.status(400).send("Invalid movie id");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getMovieInfo = async (req, res) => {
  try {
    const movieId = req.query.movieId;
    const movie = await conn.phim.findOne({
      where: {
        ma_phim: movieId,
      },
    });
    if (movie) {
      res.send(movie);
    } else {
      res.status(400).send("Invalid movie id");
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

export {
  getAllBanner,
  getMovie,
  getMovieWithPaging,
  getMovieByDay,
  deleteMovie,
  getMovieInfo,
};
