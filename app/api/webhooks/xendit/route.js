
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request) {
  const xenditXCallbackToken = 'Z9A3UpJEokuMaDXTBxF2CCv8oJcXmfN2pxVmhaQRuQqCvg9t';

  const xIncomingCallbackTokenHeader = request.headers.get('x-callback-token');

  if(xIncomingCallbackTokenHeader === xenditXCallbackToken){
    const arrRequestInput = JSON.parse(await request.text());

    const {
      id: _id,
      external_id: _externalId,
      user_id: _userId,
      status: _status,
      paid_amount: _paidAmount,
      paid_at: _paidAt,
      payment_channel: _paymentChannel,
      payment_destination: _paymentDestination
    } = arrRequestInput;

    const lunas = _externalId

    try {
        const updatedBody = {
            _externalId,
            lunas,
        }
        await fetch('/api/updatepaystatus', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBody)
        })
    } catch (error) {
        console.log(error)
    }

    return NextResponse.json({lunas});
  } else {
    return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
  }
}