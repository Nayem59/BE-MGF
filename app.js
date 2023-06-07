const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/msg", (req, res) => {
  res.status(200).send({ msg: "api is working" });
});

module.exports = app;
