'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex w-screen h-full flex-col items-center justify-center font-mono">

      <div className='w-full p-5 flex flex-col gap-14'>

        <Link
          href={'/churrasqueiro'}
          className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#d69239] font-black text-black'
        >
          Churrasqueiro
        </Link>
        <Link
          href={'/administrador'}
          className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#2ed0db] font-black text-black'
        >
          Administrador
        </Link>
        <Link
          href={'/vendedor'}
          className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#8be438] font-black text-black'
        >
          Vendedor
        </Link>
        <Link
          href={'/historico'}
          className='w-full p-3 border-[1px] rounded-lg text-[1rem] text-center bg-[#ffffff] font-black text-black'
        >
          Historico vendas
        </Link>
      </div>

    </main>
  );
}
