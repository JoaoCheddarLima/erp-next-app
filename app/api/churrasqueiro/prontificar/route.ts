'use server'

import { NextResponse } from 'next/server';

import { Item } from '@/app/models/item';
import {
  ConfirmedChurrasqueiraItemProntificarPostRequest,
} from '@/app/types/requests';
import { ItemStateTypes } from '@/app/types/sales';

import connectToDb from '../../../lib/db';

export async function POST(request: Request) {
    await connectToDb();

    //@ts-ignore
    const data: ConfirmedChurrasqueiraItemProntificarPostRequest = await request.json();

    await Item.findOneAndUpdate(
        {
            id: data.id,
            state_type: ItemStateTypes.AVAILABLE
        },
        {
            $inc: {
                supply: data.amount
            }
        }
    )

    await Item.findOneAndUpdate(
        {
            id: data.id,
            state_type: ItemStateTypes.PREPARING
        },
        {
            $inc: {
                supply: -data.amount
            }
        }
    )

    return NextResponse.json({ message: 'Hello Stranger' });
}