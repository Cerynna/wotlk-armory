const express = require("express");
const { Item, Boss } = require("../models");
const { verifAuth, verifAuthAdmin, getItemFromWoWHead } = require("../utils");
const router = express.Router();

router.get("/:id", async (req, res) => {
  let item = await Item.findOne({
    where: {
      itemID: parseInt(req.params.id),
    },
  });
  if (item) {
    return res.send(item);
  } else {
    return res.status(404).json({ error: "Item not found." });
  }
});

router.post("/delete", verifAuth, verifAuthAdmin, async (req, res) => {
  let { id } = req.body;
  console.log(id);
  if (!id) return res.status(400).json({ error: "Missing id." });
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id." });
  if (id < 0) return res.status(400).json({ error: "Invalid id." });
  if (id > 999999) return res.status(400).json({ error: "Invalid id." });

  let item = await Item.findOne({
    where: {
      id,
    },
  });
  if (!item) {
    return res.status(404).json({ error: "Item not found." });
  }
  await item.destroy();
  return res.send(item);
});

router.get("/scrap/:id", async (req, res) => {
  let { id } = req.params;
  getItemFromWoWHead(id)
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/add", verifAuth, verifAuthAdmin, async (req, res) => {
  let { bossTag, item, sizeMode } = req.body;
  if (!sizeMode) return res.status(400).json({ error: "Missing sizeMode." });
  if (!bossTag) return res.status(400).json({ error: "Missing bossTag." });
  if (!item) return res.status(400).json({ error: "Missing item." });
  if (!item.itemID) return res.status(400).json({ error: "Missing itemID." });
  if (!item.name) return res.status(400).json({ error: "Missing name." });
  if (!item.image) return res.status(400).json({ error: "Missing image." });
  if (!item.quality) return res.status(400).json({ error: "Missing quality." });
  if (!item.ilvl) return res.status(400).json({ error: "Missing ilvl." });
  if (!item.slot) return res.status(400).json({ error: "Missing slot." });

  let [size, mode] = sizeMode.split("-");

  let itemDB = await Item.findOne({
    where: {
      itemID: item.itemID,
    },
  });
  if (itemDB) {
    return res.status(400).json({ error: "Item already exists." });
  }
  let boss = await Boss.findOne({
    where: {
      tag: bossTag,
    },
  });
  if (!boss) {
    return res.status(400).json({ error: "Boss not found." });
  }

  itemDB = await Item.create({
    itemID: item.itemID,
    name: item.name,
    image: item.image,
    quality: item.quality,
    slot: item.slot,
    ilvl: item.level,
    bossID: boss.id,
    raidSize: size,
    raidMode: mode,
  });
  return res.send(itemDB);
});

module.exports = router;
