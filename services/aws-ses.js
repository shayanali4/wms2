import * as AWS from "aws-sdk";
import * as nodemailer from "nodemailer";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

AWS.config.getCredentials(function (error) {
  if (error) {
    console.log(error.stack);
  }
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

// change this to the "to" email that you want
const adminMail = "donotreply@tupack.co.uk";
// Create a transporter of nodemailer
const transporter = nodemailer.createTransport({
  SES: ses,
});
export const testMail = async ({ to, subject, body }) => {
  try {
    const response = await transporter.sendMail({
      from: adminMail,
      to: to,
      subject: subject,
      html: body,
    });
    console.log(response);
    return response?.messageId ? { ok: true } : { ok: false, msg: response };
  } catch (error) {
    console.log("ERROR", error.message);
    return { ok: false, msg: error };
  }
};
