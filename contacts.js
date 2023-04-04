const fs = require("fs").promises;
const colors = require("colors");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db/contacts.json");
const id = nanoid("21");

async function listContacts() {
  const readContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(readContacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    console.log(
      `Contact with this id ${contact} does not exist, please try again`.blue
    );
    return;
  }

  return contact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  if (!id || !email || !phone) {
    return console.log(`enter the information`.red);
  }

  contacts.push(newContact);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    console.log(
      `This contact: ${newContact.name} has been successfully added`.green
    );
  } catch (error) {
    console.log(`${error}`.red);
  }

  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === contactId);
  const deleteContact = contacts.splice(index, 1);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(
      `This contact with ID ${contactId} has been successfully deleted`.yellow
    );
  } catch (error) {
    console.log(error);
  }
  return deleteContact
}

module.exports = { listContacts, getContactById, removeContact, addContact };
