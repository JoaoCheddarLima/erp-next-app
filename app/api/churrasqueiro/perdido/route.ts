'use server'

import { NextResponse } from 'next/server';

import { Item } from '@/app/models/item';
import { ConfirmedChurrasqueiraItemPerdidoRequest } from '@/app/types/requests';
import { ItemStateTypes } from '@/app/types/sales';

import connectToDb from '../../../lib/db';

export async function POST(request: Request) {
    await connectToDb();

    //@ts-ignore
    const data: ConfirmedChurrasqueiraItemPerdidoRequest = await request.json();

    console.log(data)

    await Item.updateOne(
        {
            id: data.id,
            state_type: ItemStateTypes.LOST
        },
        {
            $inc: {
                supply: data.amount
            }
        }
    )

    await Item.updateOne(
        {
            id: data.id,
            state_type: data.lost_at_step
        },
        {
            $inc: {
                supply: -data.amount
            }
        }
    )

    return NextResponse.json({ message: 'Hello Stranger' });
}