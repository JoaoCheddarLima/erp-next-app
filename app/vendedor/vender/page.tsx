'use client';

import {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import { ConfirmedSalePostRequest } from '@/app/types/requests';

export default function Home() {
    const [soldCount, setSoldCount] = useState(0);

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
                    href="/vendedor"
                >
                    Voltar para o menu
                </Link>
            </div>

            <div className='w-full p-5 flex flex-col gap-10'>
                <div className='flex gap-5 justify-center'>
                    {
                        [1, 2, 4, 8, 10].map((value) => (
                            <button
                                className='text-[1rem] p-5 bg-[#2afe00c4] text-black font-bold rounded-md'
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
                        Quantidade vendida agora
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
                            const data: ConfirmedSalePostRequest = {
                                amount: soldCount,
                            }

                            await fetch('/api/vendedor', {
                                method: 'POST',
                                body: JSON.stringify(data),
                            })

                            window.location.href = '/vendedor';

                            setSoldCount(0);
                        }
                    }
                >
                    CONFIRMAR VENDA
                </button>
            </div>
        </main>
    );
}
