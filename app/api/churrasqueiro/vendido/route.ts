'use server'

import { NextResponse } from 'next/server';

import { Item } from '@/app/models/item';
import {
  ConfirmedChurrasqueiraSoldItemPostRequest,
} from '@/app/types/requests';
import { ItemStateTypes } from '@/app/types/sales';

import connectToDb from '../../../lib/db';

export async function POST(request: Request) {
    await connectToDb();

    //@ts-ignore
    const data: ConfirmedChurrasqueiraSoldItemPostRequest = await request.json();

    await Item.updateOne(
        {
            id: data.id,
            state_type: ItemStateTypes.SOLD
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
            state_type: data.sold_at_step
        },
        {
            $inc: {
                supply: -data.amount
            }
        }
    )

    return NextResponse.json({ message: 'Hello Stranger' });
}