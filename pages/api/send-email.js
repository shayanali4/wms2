import { testMail } from "../../services/aws-ses";

export default async function checkUserAPI(request, response) {
  console.log("req=>", request.body);
  const result = await testMail({
    to: request.body.to,
    subject: request.body.subject,
    body: request.body.emailBody,
  });
  response.json(result);
}
