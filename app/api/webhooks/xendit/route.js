import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma';

export async function POST(request) {
  const callbacktoken = process.env.XENDIT_WEBHOOK_SECRET
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

    const lunas = "LUNAS"

    try {
        const user = await prisma.user.findUnique({
          where: {
            id: _externalId
          },
          select: {
            email: true
          }
        })
        const result = await prisma.user.update({
            where: { id: _externalId },
            data: {
              paystatus: lunas,
              sisa_bayar: '0',
            },
        })
        if (user.email) {
          await prisma.accounts.update({
            where: {
              email: user.email
            },
            data: {
              sisa_pembayaran: '0'
            }
          }) 
        }
        return NextResponse.json({result}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error}, {status: 500})
    }
  } else {
    return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
  }
}