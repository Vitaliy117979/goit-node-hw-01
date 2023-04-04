// index.js
const argv = require("yargs").argv;
 const {listContacts, getContactById, removeContact, addContact } = require("./contacts")
// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts()
     console.log(list);
      break;

    case "get":
      const get = await getContactById(id)
     console.log(get);
      
      break;

    case "add":
 
     const add = await addContact(name, email, phone)
     console.log(add);
   
      break;

    case "remove":
      const remove = await removeContact(id)
      console.log(remove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);