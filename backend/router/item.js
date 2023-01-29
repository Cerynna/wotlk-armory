const express = require("express");
const { Item } = require("../models");
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
module.exports = router;
