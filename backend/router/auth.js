const express = require("express");
const { Boss, Item, User, Wishlist, ItemWishlist } = require("../models");
const router = express.Router();
const Promise = require("bluebird");

function generateToken() {
  return (
    Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
  );
}

router.use((req, res, next) => {
  console.log("Auth: ", req.path);
  next();
});
router.post("/", async (req, res) => {
  let { login, password } = req.body;
  User.findOne({
    where: {
      login: login,
      password: password,
    },
    attributes: {
      exclude: ["password", "login", "token", "createdAt", "updatedAt"],
    },
    raw: true,
  })
    .then(async (user) => {
      if (user) {
        let token = generateToken();
        await User.update(
          { token },
          {
            where: {
              login,
            },
          }
        );
        return res.send({ token, user });
      } else {
        return res.send(false);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.send(false);
    });
});
router.get("/whoiam", async (req, res) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
  }
  token = token.replace(/"/g, "");
  let user = await User.findOne({
    where: {
      token: token,
    },
    attributes: {
      exclude: ["password", "login", "token", "createdAt", "updatedAt"],
    },
    raw: true,
  });
  if (!user) {
    return res.status(401).send("Invalid token");
  }
  let wishlists = await Wishlist.findAll({
    where: {
      userID: user.id,
    },
    raw: true,
  }).then((wishlists) => {
    return Promise.map(
      wishlists,
      async (wishlist) => {
        return {
          ...wishlist,
          items: await ItemWishlist.findAll({
            where: {
              wishlistID: wishlist.id,
            },
            raw: true,
          }).then(async (items) => {
            return Promise.map(
              items,
              async (item) => {
                let itemDB = await Item.findOne({
                  where: {
                    itemID: item.itemID,
                  },
                  raw: true,
                });
                if (!itemDB)
                  return Promise.resolve({ item: null, boss: null, ...item });
                let boss = await Boss.findOne({
                  where: {
                    id: itemDB.bossID,
                  },
                  raw: true,
                });
                return {
                  item: itemDB,
                  boss,
                  ...item,
                };
              },
              { concurrency: 1 }
            );
          }),
        };
      },
      { concurrency: 1 }
    );
  });
  return res.send({ ...user, wishlists });
});

module.exports = router;
