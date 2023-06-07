const { fetchContacts, addContact } = require("../models/contacts-models");

exports.getContacts = (req, res, next) => {
  fetchContacts()
    .then((contacts) => {
      res.status(200).send({ contacts });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postContact = (req, res, next) => {
  const newContact = req.body;

  addContact(newContact)
    .then((contact) => {
      res.status(201).send({ contact });
    })
    .catch((err) => {
      next(err);
    });
};
