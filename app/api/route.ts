'use server'

import { NextResponse } from 'next/server';

import connectToDb from '../lib/db';

export async function GET(request: Request) {
    await connectToDb();
    
    const data = await request.json();

    return NextResponse.json({message: 'Hello Stranger'});
}