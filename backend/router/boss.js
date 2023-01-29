const express = require("express");
const { sortBy, groupBy } = require("lodash");
const { Boss, Item, ItemWishlist, User, Wishlist } = require("../models");
const router = express.Router();
const Promise = require("bluebird");

router.get("/", async (req, res) => {
  const bosses = await Boss.findAll({
    raw: true,
  });
  res.send(bosses);
});

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
  }).then(async (items) => {
    return Promise.map(
      items,
      async (item) => {
        const itemDB = await Item.findOne({
          where: {
            itemID: item.itemID,
          },
          raw: true,
        });
          

        const wishlists = await ItemWishlist.findAll({
          where: {
            itemID: item.itemID,
          },
          raw: true,
        }).then(async (wishlists) => {
          return Promise.map(
            wishlists,
            async (wishlist) => {
              wishlist.attributedBy = await User.findOne({
                where: {
                  id: wishlist.attributedBy,
                },
                attributes: {
                  exclude: [
                    "password",
                    "login",
                    "token",
                    "createdAt",
                    "updatedAt",
                  ],
                },
                raw: true,
              });
              let WLDB = await Wishlist.findOne({
                where: {
                  id: wishlist.wishlistID,
                },
                raw: true,
              });

              let user = await User.findOne({
                where: {
                  id: wishlist.userID,
                },
                attributes: {
                  exclude: [
                    "password",
                    "login",
                    "token",
                    "createdAt",
                    "updatedAt",
                  ],
                },
                raw: true,
              });
              return {
                ...wishlist,
                wishlist: WLDB,
                user,
              };
            },
            { concurrency: 1 }
          );
        });
        return {
          item,
          wishlists,
        };
      },
      { concurrency: 1 }
    );
  });
  const groupedItems = groupBy(items, "item.raidSize");
  groupedItems["10"] = sortBy(groupedItems["10"], ["item.raidMode"]).reverse();
  groupedItems["25"] = sortBy(groupedItems["25"], ["item.raidMode"]).reverse();

  if (!boss) return res.status(404).json({ error: "Boss not found." });
  res.send({ ...boss, items: groupedItems });
});
module.exports = router;
