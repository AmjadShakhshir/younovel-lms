import mongoose, { Model, Schema } from "mongoose";

import { Contact } from "../types/Contact";

const contactSchema = new Schema<Contact>(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    mobile: {
      type: String,
      required: [true, "Please enter your mobile"],
    },
    message: {
      type: String,
      required: [true, "Please enter your message"],
    },
  },
  { timestamps: true }
);

const ContactModel: Model<Contact> = mongoose.model("Contact", contactSchema);

export default ContactModel;
