module.exports = (sequelize, DataTypes) => {
  return sequelize.define("item-wishlist", {
    userID: DataTypes.INTEGER,
    itemID: DataTypes.INTEGER,
    wishlistID: DataTypes.INTEGER,
    attributed: DataTypes.BOOLEAN,
    attributedBy: DataTypes.INTEGER,
    attributedDate: DataTypes.DATE,
  });
};
