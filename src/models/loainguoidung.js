import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class loainguoidung extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    ma_loai_nguoi_dung: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    ten_loai: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'loainguoidung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ma_loai_nguoi_dung" },
        ]
      },
    ]
  });
  }
}
