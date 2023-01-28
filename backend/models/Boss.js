module.exports = (sequelize, DataTypes) => {
  return sequelize.define("boss", {
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    tag: DataTypes.STRING,
  });
};
