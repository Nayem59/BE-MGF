const db = require("../connection");

exports.fetchContacts = () => {
  let queryStr = `SELECT
  contacts.contact_id,
  contacts.firstname,
  contacts.lastname,
  contacts.email,
  JSON_BUILD_OBJECT(
      'id', companies.company_id,
      'name', companies.name,
      'postcode', companies.postcode
  ) AS company
  FROM contacts
  JOIN companies ON contacts.company_id = companies.company_id
  ORDER BY contacts.contact_id ASC;`;

  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};

exports.fetchContact = (contacts_id) => {
  const queryParams = [contacts_id];
  let queryStr = `SELECT
  contacts.contact_id,
  contacts.firstname,
  contacts.lastname,
  contacts.email,
  JSON_BUILD_OBJECT(
      'id', companies.company_id,
      'name', companies.name,
      'postcode', companies.postcode
  ) AS company
  FROM contacts
  JOIN companies ON contacts.company_id = companies.company_id
  WHERE contact_id = $1
  ORDER BY contacts.contact_id ASC;`;

  return db.query(queryStr, queryParams).then((result) => {
    return result.rows[0];
  });
};

exports.addContact = (newContact) => {
  const queryParams = [
    newContact.firstname,
    newContact.lastname,
    newContact.email,
    newContact.company_id,
  ];
  let queryStr = `INSERT INTO contacts
  (firstname, lastname, email, company_id)
  VALUES
  ($1,$2,$3,$4)
  RETURNING *;`;

  return db.query(queryStr, queryParams).then((result) => {
    return result.rows[0];
  });
};

exports.updateContact = (contacts_id, newContact) => {
  const queryParams = [
    newContact.firstname,
    newContact.lastname,
    newContact.email,
    newContact.company_id,
    contacts_id,
  ];
  let queryStr = `UPDATE contacts
  SET
  firstname = $1,
  lastname = $2,
  email = $3,
  company_id = $4
  WHERE contact_id = $5
  RETURNING *;`;

  return db.query(queryStr, queryParams).then((result) => {
    return result.rows[0];
  });
};

exports.fetchAreaContacts = () => {
  let queryStr = `SELECT contacts.company_id, companies.name,
  companies.postcode AS area, COUNT(*) AS contact_count
  FROM contacts
  JOIN companies ON contacts.company_id = companies.company_id
  GROUP BY contacts.company_id, companies.name, companies.postcode
  ORDER BY company_id ASC;`;

  return db.query(queryStr).then((result) => {
    return result.rows;
  });
};
