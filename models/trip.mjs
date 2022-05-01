export default function initTripModel(sequelize, DataTypes) {
  return sequelize.define(
    'trip',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
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
