import { buffer } from 'micro';
// Initialize necessary variables
const xenditWebhookSecret = process.env.XENDIT_WEBHOOK_SECRET; // Your Xendit webhook secret

export const config = { api: { bodyParser: false } };

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    const xSignature = req.headers['x-callback-signature'];

    try {
      // Verify the Xendit webhook signature

      if (xSignature !== xenditWebhookSecret) {
        // Invalid signature
        res.status(403).send('Forbidden');
        return;
      }

      // Successfully verified signature
      console.log('✅ Xendit Webhook Signature Verified');

      // Parse the request data (assuming it's in JSON format)
      const requestData = JSON.parse(buf.toString());

      // Handle the Xendit webhook event
      // ...

      // Respond with a success status
      res.status(200).send('Webhook Received and Processed');
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  }
};

export default webhookHandler;