import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _banner from  "./banner.js";
import _cumrap from  "./cumrap.js";
import _datve from  "./datve.js";
import _ghe from  "./ghe.js";
import _hethongrap from  "./hethongrap.js";
import _lichchieu from  "./lichchieu.js";
import _loainguoidung from  "./loainguoidung.js";
import _nguoidung from  "./nguoidung.js";
import _phim from  "./phim.js";
import _rapphim from  "./rapphim.js";

export default function initModels(sequelize) {
  const banner = _banner.init(sequelize, DataTypes);
  const cumrap = _cumrap.init(sequelize, DataTypes);
  const datve = _datve.init(sequelize, DataTypes);
  const ghe = _ghe.init(sequelize, DataTypes);
  const hethongrap = _hethongrap.init(sequelize, DataTypes);
  const lichchieu = _lichchieu.init(sequelize, DataTypes);
  const loainguoidung = _loainguoidung.init(sequelize, DataTypes);
  const nguoidung = _nguoidung.init(sequelize, DataTypes);
  const phim = _phim.init(sequelize, DataTypes);
  const rapphim = _rapphim.init(sequelize, DataTypes);

  rapphim.belongsTo(cumrap, { as: "ma_cum_rap_cumrap", foreignKey: "ma_cum_rap"});
  cumrap.hasMany(rapphim, { as: "rapphims", foreignKey: "ma_cum_rap"});
  datve.belongsTo(ghe, { as: "ma_ghe_ghe", foreignKey: "ma_ghe"});
  ghe.hasMany(datve, { as: "datves", foreignKey: "ma_ghe"});
  cumrap.belongsTo(hethongrap, { as: "ma_he_thong_rap_hethongrap", foreignKey: "ma_he_thong_rap"});
  hethongrap.hasMany(cumrap, { as: "cumraps", foreignKey: "ma_he_thong_rap"});
  datve.belongsTo(lichchieu, { as: "ma_lich_chieu_lichchieu", foreignKey: "ma_lich_chieu"});
  lichchieu.hasMany(datve, { as: "datves", foreignKey: "ma_lich_chieu"});
  nguoidung.belongsTo(loainguoidung, { as: "loai_nguoi_dung_loainguoidung", foreignKey: "loai_nguoi_dung"});
  loainguoidung.hasMany(nguoidung, { as: "nguoidungs", foreignKey: "loai_nguoi_dung"});
  datve.belongsTo(nguoidung, { as: "tai_khoan_nguoidung", foreignKey: "tai_khoan"});
  nguoidung.hasMany(datve, { as: "datves", foreignKey: "tai_khoan"});
  banner.belongsTo(phim, { as: "ma_phim_phim", foreignKey: "ma_phim"});
  phim.hasMany(banner, { as: "banners", foreignKey: "ma_phim"});
  lichchieu.belongsTo(phim, { as: "ma_phim_phim", foreignKey: "ma_phim"});
  phim.hasMany(lichchieu, { as: "lichchieus", foreignKey: "ma_phim"});
  ghe.belongsTo(rapphim, { as: "ma_rap_rapphim", foreignKey: "ma_rap"});
  rapphim.hasMany(ghe, { as: "ghes", foreignKey: "ma_rap"});
  lichchieu.belongsTo(rapphim, { as: "ma_rap_rapphim", foreignKey: "ma_rap"});
  rapphim.hasMany(lichchieu, { as: "lichchieus", foreignKey: "ma_rap"});

  return {
    banner,
    cumrap,
    datve,
    ghe,
    hethongrap,
    lichchieu,
    loainguoidung,
    nguoidung,
    phim,
    rapphim,
  };
}
