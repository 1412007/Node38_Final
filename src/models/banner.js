import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class banner extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_banner: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ma_phim: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'phim',
        key: 'ma_phim'
      }
    },
    hinh_anh: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'banner',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_banner" },
        ]
      },
      {
        name: "ma_phim",
        using: "BTREE",
        fields: [
          { name: "ma_phim" },
        ]
      },
    ]
  });
  }
}
