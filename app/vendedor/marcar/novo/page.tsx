'use client';

import {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import { DevedorCreate } from '@/app/types/requests';

export default function Home() {
    const [soldCount, setSoldCount] = useState(0);
    const [nome, setNome] = useState('');

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
                    href="/vendedor/marcar"
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
                        Quantidade para marcar
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

                <input
                    type="text"
                    className="p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#ffffff] text-black"
                    placeholder="Nome da pessoa"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div className='w-full p-5'>
                <button
                    className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#2afe00] font-black text-black'
                    onClick={
                        async () => {
                            const data: DevedorCreate = {
                                amount: soldCount,
                                nome
                            }

                            await fetch('/api/marcar', {
                                method: 'POST',
                                body: JSON.stringify(data),
                            })

                            window.location.href = '/vendedor/marcar';

                            setSoldCount(0);
                        }
                    }
                    disabled={!nome || soldCount === 0 || nome == ''}
                >
                    CRIAR CONTA
                </button>
            </div>
        </main>
    );
}
