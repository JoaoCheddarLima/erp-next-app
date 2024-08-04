'use client';

import React from 'react';

import VoltarPara from '@/app/components/voltar';
import {
  ConfirmedAdminstrationItemEditPostRequest,
} from '@/app/types/requests';
import { ItemTypes } from '@/app/types/sales';

export default function Home() {
    const [itemType, setItemType] = React.useState<ItemTypes>(ItemTypes.CARNE);
    const [supply, setSupply] = React.useState<number>(0);
    const [preco, setPreco] = React.useState<number>(0);

    const handleSubmit = (event: React.FormEvent) => {
        const data: ConfirmedAdminstrationItemEditPostRequest = {
            supply,
            id: itemType,
            price: preco
        }

        fetch('/api/estoque', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(result => {
                // Handle the response from the server
                console.log(result);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between font-mono">

            <div className="flex gap-5 w-full p-4 justify-around">
                {
                    <VoltarPara
                        href="/administrador"
                        label="Voltar para o menu"
                    />
                }
            </div>

            <div className='w-full p-5 flex flex-col gap-20 items-center text-[1rem]'>
                <form className="flex flex-col gap-5 w-1/2">
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

                    <label htmlFor="supply">Estoque inicial</label>
                    <input
                        type="number" id="supply" name="supply" placeholder='0' required
                        className='text-black'
                        onChange={
                            (event) => setSupply(Number(event.target.value))
                        } />
                    <label htmlFor="supply">Preço</label>
                    <input
                        type="number" id="Preço" name="Preço" placeholder='0' required
                        className='text-black'
                        onChange={
                            (event) => setPreco(Number(event.target.value))
                        } />

                    <button
                        className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#65d639] font-black text-black mt-10'
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Salvar
                    </button>
                </form>
            </div>

            <div>

            </div>

        </main>
    );
}
