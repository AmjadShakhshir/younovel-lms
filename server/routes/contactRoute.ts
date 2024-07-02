import express from "express";

import { getContact } from "../controllers/contact/getContact";
import { getAllContact } from "../controllers/contact/getAllContacts";
import { createContact } from "../controllers/contact/createContact";
import { deleteContact } from "../controllers/contact/deleteContact";

const contactRouter = express.Router();

contactRouter.get("/", getAllContact);
contactRouter.get("/:id", getContact);
contactRouter.post("/", createContact);
contactRouter.delete("/:id", deleteContact);

export default contactRouter;
