import ejs from "ejs";
import path from "path";

export const emailTemplate = async (userDataForSendingEmail: any) => {
  const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), userDataForSendingEmail);
  return html;
};
