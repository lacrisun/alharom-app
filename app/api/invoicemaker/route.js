import { Invoice as InvoiceClient, Xendit } from "xendit-node";
import { NextResponse } from "next/server";

export async function POST(req) {
    const secret = process.env.XENDIT_KEY
    const xenditClient = new Xendit({secretKey: secret})
    const { Invoice } = xenditClient
    
    const xenditInvoiceClient = new InvoiceClient({secretKey: secret})

    const userdata = await req.json()

    try {
        const response = await xenditInvoiceClient.createInvoice({
            data: userdata
        })
        return NextResponse.json({response}, {status: 200})
    } catch (error) {
        console.log('error')
        return NextResponse.json({error}, {status: 500})
    }
    
}


