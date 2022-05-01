export default function initAttractionModel(sequelize, DataTypes) {
  return sequelize.define(
    'attraction',
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
      trip_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'trips',
          key: 'id',
        },
      },
    },
    {
      underscored: true,
    }
  );
}
