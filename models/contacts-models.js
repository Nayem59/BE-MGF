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
