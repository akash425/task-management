require('dotenv').config();
const client = require('twilio')(accountSid, authToken);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


client.messages.create({
  body: 'Ahoy 👋',
  messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,

  to: process.env.MOBILE_NUMBER
}).then(message => console.log(message.sid));

/**
 * Sends an SMS message to the specified mobile number.
 *
 * @param {string} mobileNumber - The mobile number to send the message to.
 * @param {string} message - The content of the message to be sent.
 * @return {Promise<void>} A promise that resolves when the message is sent successfully, and logs the message ID.
 */
exports.sendSms = (mobileNumber, message) => {
  client.messages
    .create({
      body: message,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: mobileNumber
    })
    .then(message => console.log(message.sid));
}