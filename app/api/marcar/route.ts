'use server'

import { NextResponse } from 'next/server';

import connectToDb from '@/app/lib/db';
import { Devedores } from '@/app/models/devedores';
import { DevedorCreate } from '@/app/types/requests';

export async function POST(request: Request) {
    await connectToDb();

    const data: DevedorCreate = await request.json();

    await Devedores.create({
        nome: data.nome,
        amount: data.amount
    })

    return NextResponse.json({ resultado: true });
}

export async function GET(request: Request) {
    await connectToDb();

    const data = await Devedores.find({})

    return NextResponse.json(data);
}