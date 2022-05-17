import { Sequelize } from 'sequelize';
import allConfig from '../config/config.js';

// import model functions here

import initItemModel from './item.mjs';
import initCategoryModel from './category.mjs';
import initCartModel from './cart.mjs';
import initCartItemModel from './cartItem.mjs';

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// add model into db
db.Item = initItemModel(sequelize, Sequelize.DataTypes);
db.Category = initCategoryModel(sequelize, Sequelize.DataTypes);
db.Cart = initCartModel(sequelize, Sequelize.DataTypes);
db.CartItem = initCartItemModel(sequelize, Sequelize.DataTypes);

// associations
db.Item.belongsToMany(db.Category, { through: 'category_items' });
db.Category.belongsToMany(db.Item, { through: 'category_items' });

// connect Item and Cart models
// add the FKs into CartItem
db.Item.belongsToMany(db.Cart, { through: db.CartItem });
db.Cart.belongsToMany(db.Item, { through: db.CartItem });

// define associations to access Cart and Items from cartItems
db.Item.hasMany(db.CartItem);
db.CartItem.belongsTo(db.Item);
db.Cart.hasMany(db.CartItem);
db.CartItem.belongsTo(db.Cart);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
