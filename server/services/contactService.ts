import mongoose from "mongoose";

import { Contact } from "../types/Contact";
import ContactRepo from "../models/ContactModel";

const findAll = async () => {
  const contacts = await ContactRepo.find().sort({ createdAt: -1 });
  return contacts;
};

const findById = async (id: mongoose.Types.ObjectId) => {
  const contactId = id.toString();
  const contact = await ContactRepo.findById(contactId);
  return contact;
};

const create = async (contact: Contact) => {
  const newContact = new ContactRepo(contact);
  return await newContact.save();
};

const deleteContact = async (id: mongoose.Types.ObjectId) => {
  return await ContactRepo.findByIdAndDelete(id);
};

export default {
  findAll,
  findById,
  create,
  deleteContact,
};
