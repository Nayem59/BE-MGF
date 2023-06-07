\c contacts_data;
SELECT
    contacts.contact_id,
    contacts.firstname,
    contacts.lastname,
    contacts.email,
    JSON_BUILD_OBJECT(
        'id', companies.company_id,
        'name', companies.name,
        'postcode', companies.postcode
    ) AS companies
FROM contacts
JOIN companies ON contacts.company_id = companies.company_id;
