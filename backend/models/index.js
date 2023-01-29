const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});
const Boss = require("./Boss")(sequelize, Sequelize.DataTypes);
const Item = require("./Item")(sequelize, Sequelize.DataTypes);
const User = require("./User")(sequelize, Sequelize.DataTypes);
const Wishlist = require("./Wishlist")(sequelize, Sequelize.DataTypes);
const ItemWishlist = require("./ItemWishlist")(sequelize, Sequelize.DataTypes);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ truncate: true });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = {
  sequelize,
  Sequelize,
  Boss,
  Item,
  User,
  Wishlist,
  ItemWishlist,
};
