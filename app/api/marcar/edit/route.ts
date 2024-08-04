'use server'

import { NextResponse } from 'next/server';

import connectToDb from '@/app/lib/db';
import { Devedores } from '@/app/models/devedores';
import { Sales } from '@/app/models/sales';
import { DevedorChange } from '@/app/types/requests';

export async function POST(request: Request) {
    await connectToDb();

    const data: DevedorChange = await request.json();

    const devedor = await Devedores.findOne({
        nome: data.nome,
        amount: { $gt: 0 }
    })

    if (!devedor) return;

    await devedor.updateOne(
        {
            $inc: {
                amount: data.amount
            }
        }
    )

    if (data.amount < 0) {
        await Sales.updateOne(
            {
                type: 'DEVEDOR/' + data.nome,
            },
            {
                $inc: {
                    total: data.amount * -1
                },
                $set: {
                    timestamp: Date.now()
                }
            },
            {
                upsert: true
            }
        )
    }

    return NextResponse.json({ resultado: true });
}