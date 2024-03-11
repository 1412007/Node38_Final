import express from "express";
import rootRoutes from "./src/routes/rootRoutes.js";
import dotenv from "dotenv";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";

dotenv.config();

const app = express();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API",
      version: "0.1",
      description: "Node 38 - Do an cuoi khoa - Movie API",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
    components: {
      schemas: {
        LoaiNguoiDung: {
          type: "object",
          required: ["ten_loai"],
          properties: {
            ma_loai_nguoi_dung: {
              type: "integer",
              description: "the auto-generated id of user type",
            },
            ten_loai: {
              type: "string",
              description: "name",
            },
          },
        },
        NguoiDung: {
          type: "object",
          required: ["ho_ten", "email", "so_dt", "mat_khau", "loai_nguoi_dung"],
          properties: {
            tai_khoan: {
              type: "integer",
              description: "the auto-generated id of user",
            },
            ho_ten: {
              type: "string",
              description: "user's name",
            },
            email: {
              type: "string",
              description: "user's email",
            },
            so_dt: {
              type: "string",
              description: "user's phone number",
            },
            mat_khau: {
              type: "string",
              description: "user's password",
            },
            loai_nguoi_dung: {
              type: "string",
              description: "user's type",
            },
          },
        },
        HeThongRap: {
          type: "object",
          required: ["ten_he_thong_rap", "logo"],
          properties: {
            ma_he_thong_rap: {
              type: "integer",
              description: "the auto-generated id",
            },
            ten_he_thong_rap: {
              type: "string",
              description: "name",
            },
            logo: {
              type: "string",
              description: "logo's path",
            },
          },
        },
        CumRap: {
          type: "object",
          required: ["ten_cum_rap", "dia_chi", "ma_he_thong_rap"],
          properties: {
            ma_cum_rap: {
              type: "integer",
              description: "the auto-generated id",
            },
            ten_cum_rap: {
              type: "string",
              description: "name",
            },
            dia_chi: {
              type: "string",
              description: "address",
            },
            ma_he_thong_rap: {
              type: "string",
              description: "HeThongRap's id",
            },
          },
        },
        RapPhim: {
          type: "object",
          required: ["ten_rap", "ma_cum_rap"],
          properties: {
            ma_rap: {
              type: "integer",
              description: "the auto-generated id",
            },
            ma_cum_rap: {
              type: "integer",
              description: "CumRap's id",
            },
            ten_rap: {
              type: "string",
              description: "name",
            },
          },
        },
        Ghe: {
          type: "object",
          required: ["ten_ghe", "loai_ghe", "ma_rap"],
          properties: {
            ma_ghe: {
              type: "integer",
              description: "the auto-generated id",
            },
            ten_ghe: {
              type: "string",
              description: "name",
            },
            loai_ghe: {
              type: "string",
              description: "chair's type",
            },
            ma_rap: {
              type: "integer",
              description: "RapPhim's id",
            },
          },
        },
        Phim: {
          type: "object",
          required: [
            "ten_phim",
            "trailer",
            "hinh_anh",
            "mo_ta",
            "ngay_khoi_chieu",
            "danh_gia",
            "hot",
            "dang_chieu",
            "sap_chieu",
          ],
          properties: {
            ma_phim: {
              type: "integer",
              description: "the auto-generated id",
            },
            ten_phim: {
              type: "string",
              description: "name",
            },
            trailer: {
              type: "string",
              description: "movie trailer",
            },
            hinh_anh: {
              type: "string",
              description: "movie poster",
            },
            mo_ta: {
              type: "string",
              description: "description",
            },
            ngay_khoi_chieu: {
              type: "datetime",
              description: "premiere date",
            },
            danh_gia: {
              type: "integer",
              description: "rating",
            },
            hot: {
              type: "boolean",
              description: "is famous",
            },
            dang_chieu: {
              type: "boolean",
              description: "is showing",
            },
            sap_chieu: {
              type: "boolean",
              description: "is upcoming",
            },
          },
        },
        LichChieu: {
          type: "object",
          required: ["ma_rap", "ma_phim", "ngay_gio_chieu", "gia_ve"],
          properties: {
            ma_lich_chieu: {
              type: "integer",
              description: "the auto-generated id",
            },
            ma_phim: {
              type: "integer",
              description: "Phim's id",
            },
            ngay_gio_chieu: {
              type: "datetime",
              description: "showtimes",
            },
            gia_ve: {
              type: "integer",
              description: "price ticket",
            },
          },
        },
        DatVe: {
          type: "object",
          required: ["tai_khoan", "ma_lich_chieu", "ma_ghe"],
          properties: {
            tai_khoan: {
              type: "integer",
              description: "NguoiDung's id",
            },
            ma_lich_chieu: {
              type: "integer",
              description: "LichChieu's id",
            },
            ma_ghe: {
              type: "integer",
              description: "Ghe's id",
            },
          },
        },
        Banner: {
          type: "object",
          required: ["ma_phim", "hinh_anh"],
          properties: {
            ma_banner: {
              type: "integer",
              description: "the auto-generated id",
            },
            ma_phim: {
              type: "integer",
              description: "Phim's id",
            },
            hinh_anh: {
              type: "string",
              description: "image",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};
const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));
app.use(express.json());
app.use(rootRoutes);

app.listen(8080, () => {
  console.log("BE starting with port 8080");
});
