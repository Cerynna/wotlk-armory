module.exports = (sequelize, DataTypes) => {
  return sequelize.define("wishlist", {
    userID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    items: {
      type: DataTypes.TEXT,
      get() {
        return JSON.parse(this.getDataValue("items"));
      },
      set(val) {
        return this.setDataValue("items", JSON.stringify(val));
      },
    },
    validate: DataTypes.BOOLEAN,
  });
};
