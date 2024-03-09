import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class nguoidung extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    tai_khoan: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ho_ten: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    so_dt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mat_khau: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    loai_nguoi_dung: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'loainguoidung',
        key: 'ma_loai_nguoi_dung'
      }
    }
  }, {
    sequelize,
    tableName: 'nguoidung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tai_khoan" },
        ]
      },
      {
        name: "loai_nguoi_dung",
        using: "BTREE",
        fields: [
          { name: "loai_nguoi_dung" },
        ]
      },
    ]
  });
  }
}
