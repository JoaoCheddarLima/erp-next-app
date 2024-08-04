'use server'

import { NextResponse } from 'next/server';

import connectToDb from '@/app/lib/db';
import { Sales } from '@/app/models/sales';
import { ConfirmedSalePostRequest } from '@/app/types/requests';

export async function POST(request: Request) {
    await connectToDb();

    const data: ConfirmedSalePostRequest = await request.json();

    await Sales.create({
        timestamp: Date.now(),
        total: data.amount
    })

    return NextResponse.json({ resultado: true });
}