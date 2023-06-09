const {
  fetchContacts,
  fetchContact,
  addContact,
  updateContact,
  fetchAreaContacts,
} = require("../models/contacts-models");

exports.getContacts = (req, res, next) => {
  fetchContacts()
    .then((contacts) => {
      res.status(200).send({ contacts });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getContact = (req, res, next) => {
  const { contacts_id } = req.params;

  fetchContact(contacts_id)
    .then((contact) => {
      res.status(200).send({ contact });
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

exports.patchContact = (req, res, next) => {
  const { contacts_id } = req.params;
  const newContact = req.body;

  updateContact(contacts_id, newContact)
    .then((contact) => {
      res.status(200).send({ contact });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAreaContacts = (req, res, next) => {
  fetchAreaContacts()
    .then((companies) => {
      res.status(200).send({ companies });
    })
    .catch((err) => {
      next(err);
    });
};
