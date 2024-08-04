'use client';

import {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import { Devedor } from '@/app/types/requests';

export default function Home() {
    const [devedores, setDevedores] = useState([] as Devedor[]);

    useEffect(() => {
        function load() {
            fetch(
                '/api/marcar',
                {
                    method: 'GET'
                }
            )
                .then((res) => res.json())
                .then((data: Devedor[]) => {
                    setDevedores(data.filter(e => e.amount > 0));
                })
        }

        const interval = setInterval(() => {
            load();
        }, 500);

        return () => {
            clearInterval(interval);
            console.log('Cleanup');
        }
    }, [])
    return (
        <main className="flex min-h-screen flex-col items-center font-mono p-5 gap-5">
            <div className='w-full flex flex-col justify-evenly gap-10'>
                <Link
                    className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#fe4800c4] font-black text-black'
                    href="/vendedor"
                >
                    Voltar para o menu
                </Link>
            </div>

            {
                devedores.map((devedor) => (
                    <div key={devedor.nome} className='flex gap-5 w-full p-5 border-[1px] rounded-lg'>
                        <div className='flex gap-5 items-center'>
                            <h1 className='text-[1rem] text-center text-white'>
                                {devedor.nome}
                            </h1>
                            <h2 className='text-[1rem] text-center text-white'>
                                {devedor.amount}
                            </h2>
                        </div>
                        <div className='justify-end flex w-full gap-5 text-[1.5rem]'>
                            <h1
                                onClick={() => {
                                    fetch('/api/marcar/edit', {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            nome: devedor.nome,
                                            amount: 1
                                        })
                                    })
                                }}
                                className='px-3 border-[1px] rounded-md text-green-400'
                            >
                                +
                            </h1>
                            <h1
                                onClick={() => {
                                    fetch('/api/marcar/edit', {
                                        method: 'POST',
                                        body: JSON.stringify({
                                            nome: devedor.nome,
                                            amount: -1
                                        })
                                    })
                                }}
                                className='px-3 border-[1px] rounded-md text-red-400'
                            >
                                -
                            </h1>
                        </div>
                    </div>
                ))
            }

            <Link
                className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#8aff1cc4] font-black text-black'
                href="/vendedor/marcar/novo"
            >
                Marcar novo
            </Link>
        </main>
    );
}
