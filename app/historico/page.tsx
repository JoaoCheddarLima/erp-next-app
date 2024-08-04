'use client';

import {
  useEffect,
  useState,
} from 'react';

import ms from 'pretty-ms';

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
    const [historico, setHistorico] = useState([] as Sale[]);
    const [caixaVendas, setCaixaVendas] = useState(0);
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

            fetch('/api/historico', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((res) => res.json())
                .then((data: Sale[]) => {
                    setHistorico(data);
                    setCaixaVendas(data.reduce((acc, sale) => acc + sale.total, 0));
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
                    <h1 className='text-[1rem]'>
                        PERFORMANCE ATUAL
                    </h1>
                    <div className='flex gap-5 w-full justify-center'>
                        <div>
                            {vendidos} Retirados
                        </div>
                        <div>
                            {caixaVendas} Vendidos
                        </div>
                        <div>
                            {perdidos} Perdidos
                        </div>
                    </div>
                </div>

            </div>

            <div>
                <h1 className='text-center'>
                    HISTORICO DE VENDAS
                </h1>
                <div>
                    {
                        historico.map((sale) => (
                            <div
                                key={sale.id}
                                className='bg-[#25272c] text-[1rem] p-5 flex gap-10'
                            >
                                <div className='flex'>
                                    <h1 className='text-[1rem]'>
                                        VENDA DE {sale.total} ITENS {
                                            ms(Date.now() - sale.timestamp, {
                                                compact: true
                                            })
                                        } atrás
                                    </h1>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </main>
    );
}
