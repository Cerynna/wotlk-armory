const express = require("express");
const { sortBy, groupBy } = require("lodash");
const { Boss, Item } = require("../models");
const router = express.Router();

// middleware that is specific to this router
/* router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
}); */
// define the home page route
router.get("/:tag", async (req, res) => {
  const { tag } = req.params;
  if (!tag) return res.status(400).json({ error: "No TAG provided." });
  const boss = await Boss.findOne({
    where: {
      tag: tag,
    },
    raw: true,
  });
  const items = await Item.findAll({
    where: {
      bossID: boss.id,
    },
    raw: true,
  });
  const groupedItems = groupBy(items, "raidSize");
  groupedItems["10"] = sortBy(groupedItems["10"], ["raidMode"]).reverse();
  groupedItems["25"] = sortBy(groupedItems["25"], ["raidMode"]).reverse();

  if (!boss) return res.status(404).json({ error: "Boss not found." });
  res.send({ ...boss, items: groupedItems });
});
module.exports = router;
