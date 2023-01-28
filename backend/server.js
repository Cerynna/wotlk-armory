const express = require("express");
const cors = require("cors");


const app = express();
const port = 5000;
require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/boss", require("./router/boss"));
app.use("/auth", require("./router/auth"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
