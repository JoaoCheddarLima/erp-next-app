'use server'

import { NextResponse } from 'next/server';

import connectToDb from '@/app/lib/db';
import { Item } from '@/app/models/item';
import {
  ConfirmedAdminstrationItemEditPostRequest,
} from '@/app/types/requests';

export async function GET(request: Request) {
    await connectToDb();

    const items = await Item.find();

    return NextResponse.json(items);
}

export async function POST(request: Request) {
    await connectToDb();

    const data: ConfirmedAdminstrationItemEditPostRequest = await request.json();

    await Item.findOneAndUpdate(
        {
            id: data.id
        },
        {
            $set: {
                price: data.price,
                supply: data.supply
            }
        },
        {
            upsert: true,
            new: true
        }
    );

    return NextResponse.json({ message: 'Item updated' });
}