'use server'

import { NextResponse } from 'next/server';

import { Item } from '@/app/models/item';
import {
  ConfirmedChurrasqueiraItemAssarPostRequest,
} from '@/app/types/requests';
import { ItemStateTypes } from '@/app/types/sales';

import connectToDb from '../../../lib/db';

export async function POST(request: Request) {
    await connectToDb();

    //@ts-ignore
    const data: ConfirmedChurrasqueiraItemAssarPostRequest = await request.json();
    console.log(data)


    await Item.updateOne(
        {
            id: data.id,
            state_type: ItemStateTypes.PREPARING
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
            state_type: ItemStateTypes.STOCKED
        },
        {
            $inc: {
                supply: -data.amount
            }
        }
    )

    return NextResponse.json({ message: 'Hello Stranger' });
}