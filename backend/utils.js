const axios = require("axios");
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
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
};
