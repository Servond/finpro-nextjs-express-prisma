'use client'

import Image from 'next/image'
import DataTickets from '@/data/ticket.json'
import BuyTicketButton from './BuyTicketButtonDay1'


const RegularTicketsDay2 = () => {
    return (
        <>
            <div className='m-5 sm:m-20'>
                <div className="overflow-auto rounded-lg shadow-2xl md:grid md:grid-cols-3 bg-yellow-600">
                    <Image
                        alt=""
                        src={DataTickets[0].path}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                    />

                    <div className="p-4 text-center sm:p-6 md:col-span-2 lg:p-8">
                        <p className="text-sm font-semibold uppercase tracking-widest">Run with the pack</p>

                        <h2 className="mt-6 uppercase">
                            <span className="text-4xl font-black sm:text-5xl lg:text-6xl"> HALAMAN BELAKANG </span>
                            <br />
                            <span className="text-4xl text-white font-black sm:text-5xl lg:text-6xl"> DAY 02</span>

                            <span className="mt-2 block text-sm">PRICE Rp.250.000,-</span>
                        </h2>

                        <BuyTicketButton />

                        <p className="mt-8 text-xs font-medium uppercase text-black">
                            Offer valid until 14th Desember, 2024 *
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegularTicketsDay2;