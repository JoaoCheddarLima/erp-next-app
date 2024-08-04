'use server'

import { NextResponse } from 'next/server';

import { Sales } from '@/app/models/sales';

import connectToDb from '../../lib/db';

export async function GET(request: Request) {
    await connectToDb();

    const data = await Sales.find().sort({ timestamp: 1 })
    
    return NextResponse.json(data);
}