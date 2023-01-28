const express = require("express");
const { sortBy, groupBy } = require("lodash");
const { Boss, Item, User } = require("../models");
const router = express.Router();

function generateToken() {
  return (
    Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
  );
}

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Auth: ", req.path);
  next();
});
// define the home page route
router.post("/", async (req, res) => {
  let { login, password } = req.body;
  console.log(req.body, login, password);
  User.findOne({
    where: {
      login: login,
      password: password,
    },
    raw: true,
  })
    .then(async (user) => {
      if (user) {
        console.log(user);
        let token = generateToken();
        await User.update(
          { token },
          {
            where: {
              login,
            },
          }
        );
        /* user.token = token;
        await user.save(); */
        return res.send(token);
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
  await User.findOne({
    where: {
      token: token,
    },
    attributes: { exclude: ["password", "login"] },
    raw: true,
  })
    .then((user) => {
      if (user) {
        console.log(user);
        return res.send(user);
      } else {
        return res.send(false);
      }
    })
    .catch((err) => {
      console.log(err);
      return res.send(false);
    });
});
router.get("/", async (req, res) => {
  return res.send("Auth");
});
module.exports = router;
