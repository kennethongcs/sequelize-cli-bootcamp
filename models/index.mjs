import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

import initTripModel from './trip.mjs';
import initAttractionModel from './attraction.mjs';

// import model functions here

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};

// create a new instance of sequelize from the config files
let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// add your model definitions to db here
// add model classes to the db to be used as instances
db.Attraction = initAttractionModel(sequelize, Sequelize.DataTypes);
db.Trip = initTripModel(sequelize, Sequelize.DataTypes);

db.Attraction.belongsTo(db.Trip);
db.Trip.hasMany(db.Attraction);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
