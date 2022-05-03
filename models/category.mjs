export default function initCategoryModel(sequelize, DataTypes) {
  return sequelize.define(
    'category',
    {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.TEXT,
      },
    },
    {
      underscored: true,
    }
  );
}
