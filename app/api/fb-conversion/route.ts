import { NextResponse } from 'next/server';
import crypto from 'crypto';

const DATASET_ID = process.env.FB_DATASET_ID;
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

const hashData = (data: string) => {
  if (!data) return '';
  return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex');
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventName, email, phone, name } = body;

    const payload = {
      data: [
        {
          event_name: eventName || 'CompleteRegistration',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          user_data: {
            em: email ? [hashData(email)] : undefined,
            ph: phone ? [hashData(phone)] : undefined,
            fn: name ? [hashData(name.split(' ')[0])] : undefined,
          },
        }
      ]
    };

    const response = await fetch(`https://graph.facebook.com/v19.0/${DATASET_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("FB Conversion API Error Response:", result);
      return NextResponse.json({ success: false, error: result }, { status: response.status });
    }

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("FB Conversion API internal error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
