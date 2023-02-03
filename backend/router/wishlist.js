const express = require("express");
const { Item, User, ItemWishlist, Wishlist } = require("../models");
const router = express.Router();
const Promise = require("bluebird");
const { verifAuthAdmin, verifAuth } = require("../utils");

router.post("/", verifAuth, async (req, res) => {
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

  let name = req.body.name;
  let items = req.body.items.map((item) => {
    if (typeof item === "number") {
      return item;
    } else {
      return item.itemID;
    }
  });

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

router.post("/attrib", verifAuth, verifAuthAdmin, async (req, res) => {
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
  itemWishlist.attributedBy = req.user.id;
  itemWishlist.attributedDate = new Date();
  await itemWishlist.save();
  res.send(true);
});

router.post("/unattrib", verifAuth, verifAuthAdmin, async (req, res) => {
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

router.get("/", verifAuth, verifAuthAdmin, async (req, res) => {
  let AllWishlists = await Wishlist.findAll({
    raw: true,
  }).then(async (wishlists) => {
    return Promise.map(
      wishlists,
      async (wishlist) => {
        let user = await User.findOne({
          where: {
            id: wishlist.userID,
          },
          raw: true,
        });
        let items = await ItemWishlist.findAll({
          where: {
            wishlistID: wishlist.id,
          },
          raw: true,
        });
        items = await Promise.map(items, async (item) => {
          return await Item.findOne({
            where: {
              itemID: item.itemID,
            },
            raw: true,
          });
        });
        return {
          ...wishlist,
          user: user,
          items: items,
        };
      },
      { concurrency: 1 }
    );
  });
  return res.send(AllWishlists);
});

router.post("/togglevalid", verifAuth, verifAuthAdmin, async (req, res) => {
  let { id, value } = req.body;
  let wishlist = await Wishlist.findOne({
    where: {
      id: id,
    },
  });
  if (!wishlist) {
    return res.status(404).send("Wishlist not found");
  }
  await wishlist.update({
    validate: value,
  });
  await wishlist.save();

  res.send(value);
});

router.delete("/:id", verifAuth, verifAuthAdmin, async (req, res) => {
  let id = req.params.id;
  let wishlist = await Wishlist.findOne({
    where: {
      id: id,
    },
  });
  if (!wishlist) {
    return res.status(404).send("Wishlist not found");
  }
  let itemWishlists = await ItemWishlist.findAll({
    where: {
      wishlistID: wishlist.id,
    },
  });
  await Promise.map(
    itemWishlists,
    async (itemWishlist) => {
      await itemWishlist.destroy();
    },
    { concurrency: 1 }
  );
  await wishlist.destroy();

  res.send(true);
});

router.post("/item/:id", verifAuth, verifAuthAdmin, async (req, res) => {
  let { userID, itemID } = req.body;
  let itemWishlist = await ItemWishlist.findOne({
    where: {
      userID,
      itemID,
    },
  });
  if (!itemWishlist) {
    return res.status(404).send("Item not found");
  }
  await itemWishlist.destroy();
  return res.send(true);
});

module.exports = router;
