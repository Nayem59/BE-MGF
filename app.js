const express = require("express");
const app = express();
app.use(express.json());

const {
  getContacts,
  postContact,
} = require("./controllers/contacts-controllers");

app.get("/api/contacts", getContacts);
app.post("/api/contacts", postContact);

module.exports = app;
