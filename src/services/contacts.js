import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactbyId = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};
