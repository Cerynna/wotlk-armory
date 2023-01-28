const { load } = require("csv-load-sync");
const { sequelize, Sequelize } = require("../models");
const { getItemFromWoWHead } = require("../utils");
const WoWDB = require("wow-classic-items");

const ItemsWoW = new WoWDB.Items();

const Boss = require("../models/Boss")(sequelize, Sequelize.DataTypes);
const Item = require("../models/Item")(sequelize, Sequelize.DataTypes);
const User = require("../models/User")(sequelize, Sequelize.DataTypes);
const Wishlist = require("../models/Wishlist")(sequelize, Sequelize.DataTypes);

const Bosses = [
  {
    name: "Léviathan des Flammes",
    tag: "flame-leviathan",
    image: "https://rerollcdn.com/WOW/Raids/flame-leviathan.png",
  },
  {
    name: "Ignis le maître de la Fournaise",
    tag: "ignis-the-furnace-master",
    image: "https://rerollcdn.com/WOW/Raids/ignis-the-furnace-master.png",
  },
  {
    name: "Tranchécaille",
    tag: "razorscale",
    image: "https://rerollcdn.com/WOW/Raids/razorscale.png",
  },
  {
    name: "Déconstructeur XT-002",
    tag: "xt-002-deconstructor",
    image: "https://rerollcdn.com/WOW/Raids/xt-002-deconstructor.png",
  },
  {
    name: "L assemblée de fer",
    tag: "iron-council",
    image:
      "https://static.wikia.nocookie.net/minecraft_gamepedia/images/f/fc/Iron_Ingot_JE3_BE2.png",
  },
  {
    name: "Kologarn",
    tag: "kologarn",
    image: "https://rerollcdn.com/WOW/Raids/kologarn.png",
  },
  {
    name: "Auriaya",
    tag: "auriaya",
    image: "https://rerollcdn.com/WOW/Raids/auriaya.png",
  },
  {
    name: "Mimiron",
    tag: "mimiron",
    image: "https://rerollcdn.com/WOW/Raids/mimiron.png",
  },
  {
    name: "Freya",
    tag: "freya",
    image: "https://rerollcdn.com/WOW/Raids/freya.png",
  },
  {
    name: "Thorim",
    tag: "thorim",
    image: "https://rerollcdn.com/WOW/Raids/thorim.png",
  },
  {
    name: "Hodir",
    tag: "hodir",
    image: "https://rerollcdn.com/WOW/Raids/hodir.png",
  },
  {
    name: "General Vezax",
    tag: "general-vezax",
    image: "https://rerollcdn.com/WOW/Raids/general-vezax.png",
  },
  {
    name: "Yogg-Saron",
    tag: "yogg-saron",
    image: "https://rerollcdn.com/WOW/Raids/yogg-saron.png",
  },
  {
    name: "Algalon",
    tag: "algalon-the-observer",
    image: "https://rerollcdn.com/WOW/Raids/algalon-the-observer.png",
  },
  {
    name: "Trash",
    tag: "trash",
    image: "https://rerollcdn.com/WOW/Raids/algalon-the-observer.png",
  },
  {
    name: "Craft",
    tag: "craft",
    image: "https://rerollcdn.com/WOW/Raids/algalon-the-observer.png",
  },
];

function getListBoss() {
  return Bosses;
}
function getlistItems() {
  /*  console.assert = () => {}; */
  const items = load(__dirname + "/lootBoss.csv");
  return items;
}

(async () => {
  console.log("Start seeding");
  await sequelize.sync({ force: true });

  await User.create({
    login: "Hystérias",
    password: "azerty",
    pseudo: "Hystérias",
    classe: "druid",
    role: "heal",
    isAdmin: true,
  });

  await Promise.all(getListBoss().map((boss) => Boss.create(boss)));
  await Promise.all(
    getlistItems().map((item) => {
      Boss.findOne({
        where: {
          name: item.BOSS,
        },
      }).then(async (boss) => {
        console.log(boss.name);
        let itemWH = await getItemFromWoWHead(item.ITEMID);
        let cleanItem = {
          itemID: item.ITEMID,
          bossID: boss.id,
          name: itemWH && itemWH.name,
          slot: itemWH && itemWH.inventorySlot,
          quality: itemWH && itemWH.quality,
          image: itemWH && itemWH.icon,
          ilvl: itemWH && itemWH.level,
          raidSize: item.SIZE,
          raidMode: item.MODE,
        };
        Item.create(cleanItem);
      });
    })
  );
})();
