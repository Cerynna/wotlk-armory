module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    pseudo: DataTypes.STRING,
    classe: DataTypes.STRING,
    role: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
  });
};
