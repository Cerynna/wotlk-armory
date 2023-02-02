const express = require("express");
const router = express.Router();
const Promise = require("bluebird");

const { User, Wishlist } = require("../models");
const { verifAuth, verifAuthAdmin } = require("../utils");

router.use((req, res, next) => {
  console.log("User: ", req.path);
  next();
});

router.get("/", async (req, res) => {
  let users = await User.findAll({
    attributes: {
      exclude: ["password", "login", "token", "createdAt", "updatedAt"],
    },
    raw: true,
  }).then(async (users) => {
    await Promise.map(
      users,
      async (user) => {
        let wishlists = await Wishlist.findAll({
          where: {
            userId: user.id,
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          raw: true,
        });
        user.wishlists = wishlists;
      },
      { concurrency: 1 }
    );
    return users;
  });

  return res.send(users);
});

router.post("/beadmin", verifAuth, verifAuthAdmin, async (req, res) => {
  let { id } = req.body;
  let user = await User.update(
    { isAdmin: true },
    {
      where: {
        id,
      },
    }
  );
  return res.send(user);
});

module.exports = router;
