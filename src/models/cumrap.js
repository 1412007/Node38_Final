import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cumrap extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_cum_rap: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_cum_rap: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dia_chi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ma_he_thong_rap: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'hethongrap',
        key: 'ma_he_thong_rap'
      }
    }
  }, {
    sequelize,
    tableName: 'cumrap',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_cum_rap" },
        ]
      },
      {
        name: "ma_he_thong_rap",
        using: "BTREE",
        fields: [
          { name: "ma_he_thong_rap" },
        ]
      },
    ]
  });
  }
}
