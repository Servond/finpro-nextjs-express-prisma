'use client'

import Image from 'next/image'
import BuyTicketButton from './BuyTicketButtonDay1'
import DataTicket from '@/data/ticket.json'

const RegularTicketsDay1 = () => {
    return (
        <>
            <div className='m-5 sm:m-20'>
                <div className="overflow-auto rounded-lg shadow-2xl md:grid md:grid-cols-3 bg-black">
                    <Image
                        alt=""
                        src={DataTicket[1].path}
                        width={500}
                        height={500}
                        className="w-full object-cover md:h-full"
                    />
                    <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
                        <p className="text-sm text-white font-semibold uppercase tracking-widest">Run with the pack</p>

                        <h2 className="mt-6 uppercase">
                            <span className="text-4xl font-black text-yellow-600 sm:text-5xl lg:text-6xl"> HALAMAN BELAKANG</span>
                            <br />
                            <span className="text-4xl text-white font-black sm:text-5xl lg:text-6xl"> DAY 01</span>
                            <span className="mt-2 block text-white text-sm">PRICE Rp.250.000,-</span>
                        </h2>

                        <BuyTicketButton />

                        <p className="mt-8 text-xs font-medium uppercase text-white">
                            Offer valid until 13th Desember, 2024 *
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegularTicketsDay1;