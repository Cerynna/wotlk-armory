const axios = require("axios");
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
const { User } = require("./models");
module.exports = {
  getItemFromWoWHead: async (itemID) => {
    let url = `https://www.wowhead.com/wotlk/fr/item=${itemID}&xml`;
    let response = await axios.get(url).catch((err) => {
      return false;
    });
    let data = response.data;
    const parser = new XMLParser();
    let jObj = parser.parse(data);
    return jObj.wowhead.item;
  },

  verifAuthAdmin: async (req, res, next) => {
    let { user } = req;
    if (user.isAdmin === false) {
      return res.status(401).json("Not admin");
    }
    next();
  },

  verifAuth: async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json("No token");
    }
    if (token) {
      token = token.split(" ")[1];
    }
    token = token.replace(/"/g, "");
    let user = await User.findOne({
      where: { token: token },
      attributes: {
        exclude: ["password", "login", "token", "createdAt", "updatedAt"],
      },
      raw: true,
    });
    if (!user) {
      return res.status(401).json("Invalid token");
    }
    req.user = user;
    next();
  },
};
