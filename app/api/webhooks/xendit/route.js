
export async function POST(req) {
    const secret = process.env.XENDIT_WEBHOOK_SECRET

    const xenditCallbackToken = 'Z9A3UpJEokuMaDXTBxF2CCv8oJcXmfN2pxVmhaQRuQqCvg9t'
  
    // Get the request headers
    const reqHeaders = req.headers;
    const xIncomingCallbackTokenHeader = reqHeaders['x-callback-token'] || '';
  
    // Verify if the request is from Xendit
    if (xIncomingCallbackTokenHeader === xenditCallbackToken) {
      // Request is verified to be from Xendit
  
      // Read the raw request input as JSON
      const rawRequestInput = await new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          resolve(body);
        });
      });
  
      // Parse the raw input into an associative array
      const arrRequestInput = JSON.parse(rawRequestInput);
      
      console.log(arrRequestInput);
  
      const {
        id,
        external_id,
        user_id,
        status,
        paid_amount,
        paid_at,
        payment_channel,
        payment_destination,
      } = arrRequestInput;
  
      // You can now use the above object properties for further processing in your application.
  
      // Send a response (modify this as needed)
      return new Response('Callback received and processed successfully.', { status: 200 });
    } else {
      // Request is not from Xendit, reject with HTTP status 403
      return new Response('Forbidden', { status: 403 });
    }
  }
  