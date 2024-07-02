import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const emailTemplate = async (userDataForSendingEmail: any) => {
  const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), userDataForSendingEmail);
  return html;
};
