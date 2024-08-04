'use client';

import {
  useEffect,
  useState,
} from 'react';

import Link from 'next/link';

import BackToMenu from '../components/menu';
import {
  Estoque,
  Item,
  ItemStateTypes,
  ItemTypes,
  Sale,
} from '../types/sales';

export default function Home() {
    const [data, setData] = useState(0);
    const [vendas, setVendas] = useState([] as Sale[]);
    const [vendidos, setVendidos] = useState(0);
    const [perdidos, setPerdidos] = useState(0);
    const [estoque, setEstoque] = useState({
        [ItemTypes.CARNE]: 0,
        [ItemTypes.MEDALHAO]: 0,
        [ItemTypes.LINGUICA]: 0
    } as Estoque);
    const [makingStock, setMakingStock] = useState({
        [ItemTypes.CARNE]: 0,
        [ItemTypes.MEDALHAO]: 0,
        [ItemTypes.LINGUICA]: 0
    } as Estoque);
    const [readyStock, setReadyStock] = useState({
        [ItemTypes.CARNE]: 0,
        [ItemTypes.MEDALHAO]: 0,
        [ItemTypes.LINGUICA]: 0
    } as Estoque);
    const [soldStock, setSoldStock] = useState({
        [ItemTypes.CARNE]: 0,
        [ItemTypes.MEDALHAO]: 0,
        [ItemTypes.LINGUICA]: 0
    } as Estoque);
    const [lostStock, setLostStock] = useState({
        [ItemTypes.CARNE]: 0,
        [ItemTypes.MEDALHAO]: 0,
        [ItemTypes.LINGUICA]: 0
    } as Estoque);

    useEffect(() => {
        function load() {
            fetch('/api/estoque', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => res.json())
                .then((data: Item[]) => {
                    setVendidos(0);
                    setPerdidos(0);
                    for (const item of data) {
                        if (item.state_type === ItemStateTypes.STOCKED) {
                            setEstoque((prev) => ({
                                ...prev,
                                [item.id]: item.supply
                            }));
                        }

                        if (item.state_type === ItemStateTypes.SOLD) {
                            setSoldStock((prev) => ({
                                ...prev,
                                [item.id]: item.supply
                            }));

                            setVendidos(prev => prev + item.supply);
                        }

                        if (item.state_type === ItemStateTypes.PREPARING) {
                            setMakingStock((prev) => ({
                                ...prev,
                                [item.id]: item.supply
                            }));
                        }

                        if (item.state_type === ItemStateTypes.AVAILABLE) {
                            setReadyStock((prev) => ({
                                ...prev,
                                [item.id]: item.supply
                            }));
                        }

                        if (item.state_type === ItemStateTypes.LOST) {
                            setLostStock((prev) => ({
                                ...prev,
                                [item.id]: item.supply
                            }));

                            setPerdidos(prev => prev + item.supply);
                        }

                    }
                });
        }
        const interval = setInterval(() => {
            load()
        }, 5000);

        load();

        return (() => {
            clearInterval(interval);
        })
    }, [])
    return (
        <main className="flex min-h-screen flex-col items-center font-mono p-5 gap-8">
            <div className='w-full flex flex-col justify-evenly gap-5'>
                {<BackToMenu />}
            </div>

            <div className='w-full text-center flex flex-col gap-3'>
                <div className="flex flex-col w-full p-3 gap-2 justify-around bg-[#25272c] text-[1rem]">
                    <h1 className='text-[1rem] text-orange-400'>
                        NO ISOPOR (PRONTO OU PRÉ-ASSADO)
                    </h1>
                    <div className='flex gap-5 w-full justify-around'>
                        <div>
                            {readyStock[ItemTypes.CARNE] || 0} {ItemTypes.CARNE}
                        </div>
                        <div>
                            {readyStock[ItemTypes.MEDALHAO] || 0} {ItemTypes.MEDALHAO}
                        </div>
                        <div>
                            {readyStock[ItemTypes.LINGUICA] || 0} {ItemTypes.LINGUICA}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full p-3 gap-2 justify-around bg-[#25272c] text-[1rem]">
                    <h1 className='text-[1rem] text-red-500'>
                        NA CHURRASQUEIRA
                    </h1>
                    <div className='flex gap-5 w-full justify-around'>
                        <div>
                            {makingStock[ItemTypes.CARNE]} {ItemTypes.CARNE}
                        </div>
                        <div>
                            {makingStock[ItemTypes.MEDALHAO]} {ItemTypes.MEDALHAO}
                        </div>
                        <div>
                            {makingStock[ItemTypes.LINGUICA]} {ItemTypes.LINGUICA}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full p-3 gap-2 justify-around bg-[#25272c] text-[1rem]">
                    <h1 className='text-[1rem]'>
                        NO ESTOQUE
                    </h1>
                    <div className='flex gap-5 w-full justify-around'>
                        <div>
                            {estoque[ItemTypes.CARNE]} {ItemTypes.CARNE}
                        </div>
                        <div>
                            {estoque[ItemTypes.MEDALHAO] || 0} {ItemTypes.MEDALHAO}
                        </div>
                        <div>
                            {estoque[ItemTypes.LINGUICA] || 0} {ItemTypes.LINGUICA}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full p-3 gap-2 justify-around bg-[#25272c] text-[1rem]">
                    <h1 className='text-[1rem]'>
                        PERFORMANCE ATUAL
                    </h1>
                    <div className='flex gap-5 w-full justify-center'>
                        <div>
                            {vendidos} Vendidos
                        </div>
                        <div>
                            {perdidos} Perdidos
                        </div>
                    </div>
                </div>

            </div>

            <Link
                className='w-full border-[1px] rounded-lg text-[1rem] mt-2 p-3 text-center bg-[#84e633] font-black text-black'
                href="/vendedor/vender"
            >
                Nova venda
            </Link>
            <Link
                className='w-full border-[1px] rounded-lg text-[1rem] mt-2 p-3 text-center bg-[#ffcc24] font-black text-black'
                href="/vendedor/marcar"
            >
                Marcar na conta
            </Link>

        </main>
    );
}
