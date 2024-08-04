'use client';

import {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import { ConfirmedChurrasqueiraItemPerdidoRequest } from '@/app/types/requests';
import {
  ItemStateTypes,
  ItemTypes,
} from '@/app/types/sales';

export default function Home() {
    const [soldCount, setSoldCount] = useState(0);
    const [itemType, setItemType] = useState(ItemTypes.CARNE);
    const [soldAtStep, setSoldAtStep] = useState(ItemStateTypes.AVAILABLE);

    useEffect(() => {
        return () => {
            console.log('Cleanup');
        }
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center font-mono p-5">
            <div className='w-full flex flex-col justify-evenly gap-10'>
                <Link
                    className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#fe4800c4] font-black text-black'
                    href="/churrasqueiro"
                >
                    Voltar para o menu
                </Link>
            </div>

            <div className='w-full p-5 flex flex-col gap-10 items-center'>
                <form className="flex flex-col gap-2 w-1/2 text-[1rem]">
                    <label htmlFor="id">Tipo de espeto</label>
                    <select id="id" name="id" className='text-black' required
                        onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                        ) => {
                            setItemType(event.target.value as ItemTypes);
                        }}
                    >
                        {
                            [
                                ItemTypes.CARNE,
                                ItemTypes.MEDALHAO,
                                ItemTypes.LINGUICA
                            ]
                                .map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))
                        }
                    </select>
                    <label htmlFor="id">Perdeu item na</label>
                    <select id="id" name="id" className='text-black' required
                        onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                        ) => {
                            setSoldAtStep(event.target.value as ItemStateTypes);
                        }}
                    >
                        {
                            [
                                ItemStateTypes.AVAILABLE,
                                ItemStateTypes.PREPARING
                            ]
                                .map((item) => (
                                    <option key={item} value={item}>{item}</option>
                                ))
                        }
                    </select>
                </form>
                <div className='flex gap-5 justify-center'>
                    {
                        [1, 2, 4, 8, 10].map((value) => (
                            <button
                                className='text-[1rem] p-5 bg-[#2afe00c4] text-black font-bold rounded-md'
                                key={value}
                                onClick={
                                    () => setSoldCount(soldCount + value)
                                }
                            >
                                +{value}
                            </button>
                        ))
                    }
                </div>

                <div className='bg-[#25272c]'>
                    <h1 className='text-[1rem] text-green-400 text-center p-5 flex flex-col gap-5'>
                        Quantidade perdida
                        <p className='text-white text-6xl'>
                            {soldCount}
                        </p>
                    </h1>
                </div>

                <div className='flex gap-5 justify-center'>
                    {
                        [1, 2, 4, 8, 10].map((value) => (
                            <button
                                className='text-[1rem] p-5 bg-[#fe4800c4] text-black font-bold rounded-md'
                                onClick={
                                    () => setSoldCount(soldCount - value > 0 ? soldCount - value : 0)
                                }
                            >
                                -{value}
                            </button>
                        ))
                    }
                </div>
            </div>

            <div className='w-full p-5'>
                <button
                    className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#2afe00] font-black text-black'
                    onClick={
                        async () => {
                            const data: ConfirmedChurrasqueiraItemPerdidoRequest = {
                                amount: soldCount,
                                id: itemType,
                                lost_at_step: soldAtStep
                            }

                            await fetch('/api/churrasqueiro/perdido', {
                                method: 'POST',
                                body: JSON.stringify(data),
                            })

                            window.location.href = '/churrasqueiro';

                            setSoldCount(0);
                        }
                    }
                >
                    CONFIRMAR PERDA
                </button>
            </div>
        </main>
    );
}
