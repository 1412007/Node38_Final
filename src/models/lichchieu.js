import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class lichchieu extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_lich_chieu: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ma_rap: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rapphim',
        key: 'ma_rap'
      }
    },
    ma_phim: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'phim',
        key: 'ma_phim'
      }
    },
    ngay_gio_chieu: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gia_ve: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'lichchieu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_lich_chieu" },
        ]
      },
      {
        name: "ma_rap",
        using: "BTREE",
        fields: [
          { name: "ma_rap" },
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
