import _sequelize from "sequelize";
const { Model, Sequelize } = _sequelize;

export default class datve extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        tai_khoan: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "nguoidung",
            key: "tai_khoan",
          },
          primaryKey: true,
        },
        ma_lich_chieu: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "lichchieu",
            key: "ma_lich_chieu",
          },
        },
        ma_ghe: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "ghe",
            key: "ma_ghe",
          },
        },
      },
      {
        sequelize,
        tableName: "datve",
        timestamps: false,
        indexes: [
          {
            name: "ma_lich_chieu",
            using: "BTREE",
            fields: [{ name: "ma_lich_chieu" }],
          },
          {
            name: "ma_ghe",
            using: "BTREE",
            fields: [{ name: "ma_ghe" }],
          },
          {
            name: "tai_khoan",
            using: "BTREE",
            fields: [{ name: "tai_khoan" }],
          },
        ],
      }
    );
  }
}
