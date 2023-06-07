const db = require("./connection");
const format = require("pg-format");
const { users, companies } = require("./data");

const seed = (users, companies) => {
  return db
    .query(`DROP TABLE IF EXISTS contacts;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS companies;`);
    })
    .then(() => {
      const createCompany = db.query(`
        CREATE TABLE companies (
            company_id INT PRIMARY KEY,
            name varchar(70) NOT NULL,
            postcode varchar(6) NOT NULL
        );`);
      return createCompany;
    })
    .then(() => {
      const createContacts = db.query(`
        CREATE TABLE contacts (
            contact_id SERIAL PRIMARY KEY,
            firstname varchar(50) NOT NULL,
            lastname varchar(50) NOT NULL,
            email varchar(90) NOT NULL,
            company_id INT REFERENCES companies(company_id) NOT NULL
        );`);
      return createContacts;
    })
    .then(() => {
      const insertCompaniesData = format(
        "INSERT INTO companies (company_id, name, postcode) VALUES %L RETURNING *",
        companies.map((company) => [company.id, company.name, company.postcode])
      );
      return db.query(insertCompaniesData);
    })
    .then(() => {
      const insertUsersData = format(
        "INSERT INTO contacts (firstname, lastname, email, company_id) VALUES %L RETURNING *",
        users.map((user) => [
          user.firstname,
          user.lastname,
          user.email,
          user.company.id,
        ])
      );
      return db.query(insertUsersData);
    })
    .then(() => {
      console.log("seed worked");
    });
};

seed(users, companies).then(() => {
  db.end();
});
