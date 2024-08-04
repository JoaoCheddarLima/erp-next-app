'use client';

import {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import BackToMenu from '../components/menu';
import {
  Item,
  ItemStateTypes,
} from '../types/sales';

export default function Home() {
    const [estoque, setEstoque] = useState([] as Item[]);

    useEffect(() => {
        fetch('/api/estoque', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data: Item[]) => {
                setEstoque(data.filter(e => e.state_type == ItemStateTypes.STOCKED));
                console.log(data);
            });

        return (() => { })
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center font-mono gap-5">

            <div className="flex gap-5 w-full p-4 justify-around flex-col">
                {<BackToMenu />}
                {
                    estoque.map((item) => (
                        <div
                            className='bg-[#25272c] text-[1rem] p-5 flex gap-10'
                            key={item.id}
                        >
                            <div className='flex'>
                                <h1 className='text-[1rem]'>
                                    {item.supply} {item.id} EM ESTOQUE
                                </h1>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='w-full p-5 flex flex-col gap-5'>
                <Link
                    href={'/churrasqueiro/perdido'}
                    className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#ff3e1c] font-black text-black'
                >
                    Perdido
                </Link>
                <Link
                    href={'/churrasqueiro/prontificar'}
                    className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#2ec2fc] font-black text-black'
                >
                    Guardar pronto
                </Link>
                <Link
                    href={'/churrasqueiro/assar'}
                    className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#fca92e] font-black text-black'
                >
                    Assar
                </Link>
                <Link
                    href={'/churrasqueiro/vendido'}
                    className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#00ff2a] font-black text-black'
                >
                    Vender
                </Link>
            </div>

            <div>

            </div>

        </main>
    );
}
