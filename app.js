const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());

const {
  getContacts,
  getContact,
  postContact,
  patchContact,
  getAreaContacts,
} = require("./controllers/contacts-controllers");

app.get("/api/contacts", getContacts);
app.get("/api/contacts/:contacts_id", getContact);
app.post("/api/contacts", postContact);
app.patch("/api/contacts/:contacts_id", patchContact);
app.get("/api/area", getAreaContacts);

module.exports = app;
