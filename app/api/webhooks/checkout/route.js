import fetch from 'node-fetch';

export async function POST(req) {
    const url = 'https://api.xendit.co/callback_urls/:invoice';
    const secret = process.env.XENDIT_KEY
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(secret).toString('base64')}`,
    };

    const data = {
      url: 'https://www.xendit.co/callback_catcher',
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        res.status(200).json(result);
      } else {
        const errorText = await response.text();
        res.status(response.status).json({ error: errorText });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}