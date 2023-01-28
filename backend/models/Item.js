module.exports = (sequelize, DataTypes) => {
  return sequelize.define("item", {
    itemID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    slot: DataTypes.STRING,
    quality: DataTypes.STRING,
    ilvl: DataTypes.INTEGER,
    bossID: DataTypes.INTEGER,
    raidSize: DataTypes.INTEGER,
    raidMode: DataTypes.STRING,
  });
};
