// snippet-start:[ses.JavaScript.email.sendEmailV3]
// Create the promise and SES service object

// Import required AWS SDK clients and commands for Node.js
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { sesClient } from '../../lib/sesClient';

// Set the parameters
const params = {
  Destination: {
    /* required */

    CcAddresses: [
      /* more items */
      'ede.george@tupack.co.uk',
    ],
    ToAddresses: [
      'RECEIVER_ADDRESS', //RECEIVER_ADDRESS
      /* more To-email addresses */
      'ede.george@tupack.co.uk',
    ],
  },
  Message: {
    /* required */
    Body: {
      /* required */
      Html: {
        Charset: 'UTF-8',
        Data: 'HTML_FORMAT_BODY',
      },
      Text: {
        Charset: 'UTF-8',
        Data: 'TEXT_FORMAT_BODY',
      },
    },
    Subject: {
      Charset: 'UTF-8',
      Data: 'EMAIL_SUBJECT',
    },
  },
  Source: 'ede.george@tupack.co.uk', // SENDER_ADDRESS
  ReplyToAddresses: [
    /* more items */
  ],
};

export const run = async () => {
  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    console.log('Success', data);
    return data; // For unit tests.
  } catch (err) {
    console.log('Error', err);
  }
};
run();
// snippet-end:[ses.JavaScript.email.sendEmailV3]
// For unit tests only.
// module.exports = { run, params };
