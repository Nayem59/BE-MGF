const express = require("express");
const app = express();
app.use(express.json());

const {
  getContacts,
  postContact,
  patchContact,
  getAreaContacts,
} = require("./controllers/contacts-controllers");

app.get("/api/contacts", getContacts);
app.post("/api/contacts", postContact);
app.patch("/api/contacts/:contacts_id", patchContact);
app.get("/api/area", getAreaContacts);

module.exports = app;
