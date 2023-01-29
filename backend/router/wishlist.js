const express = require("express");
const { Item, User, ItemWishlist, Wishlist } = require("../models");
const router = express.Router();
const Promise = require("bluebird");

router.post("/", async (req, res) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
  }
  token = token.replace(/"/g, "");

  let name = req.body.name;
  let items = req.body.items.map((item) => {
    if (typeof item === "number") {
      return item;
    } else {
      return item.itemID;
    }
  });
  let user = await User.findOne({
    where: { token: token },
    attributes: {
      exclude: ["password", "login", "token", "createdAt", "updatedAt"],
    },
    raw: true,
  });
  if (!user) {
    return res.status(401).send("Invalid token");
  }
  let wishlist = (
    await Wishlist.findOrCreate({
      where: {
        name: name,
        userID: user.id,
      },
      defaults: {
        name: name,
        userID: user.id,
        validate: false,
      },
      raw: true,
    })
  )[0];
  await Promise.map(
    items,
    (item) => {
      return ItemWishlist.findOrCreate({
        where: {
          userID: user.id,
          itemID: item,
          wishlistID: wishlist.id,
        },
        defaults: {
          userID: user.id,
          itemID: item,
          wishlistID: wishlist.id,
          attributed: false,
        },
      });
    },
    { concurrency: 1 }
  );
  res.send(true);
});

router.post("/attrib", async (req, res) => {
  let token = req.headers.authorization;
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
    return res.status(401).send("Invalid token");
  }
  if (user.isAdmin === false) {
    return res.status(401).send("Not admin");
  }
  let { itemID, wishlistID } = req.body;
  let itemWishlist = await ItemWishlist.findOne({
    where: {
      itemID: itemID,
      wishlistID: wishlistID,
    },
  });
  if (!itemWishlist) {
    return res.status(404).send("Item not found");
  }
  itemWishlist.attributed = true;
  itemWishlist.attributedBy = user.id;
  itemWishlist.attributedDate = new Date();
  await itemWishlist.save();
  res.send(true);
});

router.post("/unattrib", async (req, res) => {
  let token = req.headers.authorization;
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
    return res.status(401).send("Invalid token");
  }
  if (user.isAdmin === false) {
    return res.status(401).send("Not admin");
  }

  let { itemID, wishlistID } = req.body;
  let itemWishlist = await ItemWishlist.findOne({
    where: {
      itemID: itemID,
      wishlistID: wishlistID,
    },
  });
  if (!itemWishlist) {
    return res.status(404).send("Item not found");
  }
  itemWishlist.attributed = false;
  itemWishlist.attributedBy = null;
  itemWishlist.attributedDate = null;
  await itemWishlist.save();
  res.send(true);
});

module.exports = router;
