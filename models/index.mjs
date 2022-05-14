import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

// import model functions here
import initCategoryModel from './category.mjs';
import initItemModel from './item.mjs';

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  { logging: false }
);

// add your model definitions to db here
db.Item = initItemModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);

db.Item.belongsToMany(db.Category, { through: 'category_items' });
db.Category.belongsToMany(db.Item, { through: 'category_items' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
