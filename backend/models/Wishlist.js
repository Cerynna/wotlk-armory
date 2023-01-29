module.exports = (sequelize, DataTypes) => {
  return sequelize.define("wishlist", {
    userID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    validate: DataTypes.BOOLEAN,
  });
};
