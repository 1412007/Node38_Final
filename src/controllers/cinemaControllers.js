import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import rapphim from "../models/rapphim.js";
import cumrap from "../models/cumrap.js";

const conn = initModels(sequelize);

const getCinema = async (req, res) => {
  try {
    const cinemaId = req.query.cinemaId;
    if (cinemaId) {
      const data = await conn.hethongrap.findOne({
        where: {
          ma_he_thong_rap: cinemaId,
        },
      });
      res.send(data);
    } else {
      const data = await conn.hethongrap.findAll();
      res.send(data);
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getCinemaGroup = async (req, res) => {
  try {
    const cinemaId = req.query.cinemaId;
    if (cinemaId) {
      const data = await conn.cumrap.findAll({
        where: {
          ma_he_thong_rap: cinemaId,
        },
      });
      res.send(data);
    } else {
      res.status(400).send("Bad request");
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getShowtimeByCinema = async (req, res) => {
  try {
    const cinemaId = req.query.cinemaId;
    if (cinemaId) {
      const showTimes = await conn.lichchieu.findAll({
        include: {
          model: rapphim,
          as: "ma_rap_rapphim",
          include: {
            model: cumrap,
            as: "ma_cum_rap_cumrap",
            where: {
              ma_he_thong_rap: cinemaId,
            },
          },
        },
      });
      res.send(showTimes);
    } else {
      res.status(400).send("Bad request");
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

const getShowtime = async (req, res) => {
  try {
    const movieId = req.query.movieId;
    if (movieId) {
      const showTimes = await conn.lichchieu.findAll({
        where: {
          ma_phim: movieId,
        },
      });
      res.send(showTimes);
    } else {
      res.status(400).send("Bad request");
    }
  } catch (error) {
    console.log(`Back end error: ${error}`);
  }
};

export { getCinema, getCinemaGroup, getShowtimeByCinema, getShowtime };
