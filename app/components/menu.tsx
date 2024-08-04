import Link from 'next/link';

export default function BackToMenu() {
    return (
        <Link
            className='w-full p-1 border-[1px] rounded-lg text-[1rem] text-center bg-[#fe4800c4] font-black text-black'
            href="/#"
        >
            Voltar para o inicio
        </Link>
    )
}