import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class rapphim extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_rap: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_rap: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ma_cum_rap: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cumrap',
        key: 'ma_cum_rap'
      }
    }
  }, {
    sequelize,
    tableName: 'rapphim',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_rap" },
        ]
      },
      {
        name: "ma_cum_rap",
        using: "BTREE",
        fields: [
          { name: "ma_cum_rap" },
        ]
      },
    ]
  });
  }
}
