'use client'

import Image from "next/image";

import JasaRaharja from "@/assets/Jasa Raharja.png"
import PLN from "@/assets/PLN.png"
import Haus from "@/assets/Haus.png"
import Gojek from "@/assets/Gojek.png"
import Uniqlo from "@/assets/Uniqlo.png"
import BCA from "@/assets/BCA.png"
import TransTv from "@/assets/Trans TV.png"

export const Footer = () => {
  return <>

  {/* Judul */}
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-yellow-600">
          <p className="text-2xl font-bold sm:text-5xl">HALAMAN BELAKANG</p>
        </div>
        <p className="text-sm text-center text-white font-serif sm:text-2xl">Intimate Music Show With Green</p>
        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-white font-serif">
          Our Partners:
        </p>

  {/* Sponsor */}
        <ul className="mt-12 flex justify-center gap-3 md:gap-8">
          <li>
            <Image src={JasaRaharja} height={50} alt="Logo Jasa Raharja" />
          </li>

          <li>
            <Image src={PLN} height={50} alt="Logo PLN" />
          </li>

          <li>
            <Image src={Haus} height={50} alt="Logo Haus" />
          </li>

          <li>
            <Image src={Gojek} height={50} alt="Logo Gojek" />
          </li>

          <li>
            <Image src={Uniqlo} height={50} alt="Logo Uniqlo" />
          </li>

          <li>
            <Image src={BCA} height={50} alt="Logo BCA" />
          </li>

          <li>
            <Image src={TransTv} height={50} alt="Logo Trans TV" />
          </li>
        </ul>

{/* Navigator */}
        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Home </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Tickets </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Day 1 </a>
          </li>

          <li>
            <a className="text-white transition hover:text-gray-700/75" href="#"> Day 2 </a>
          </li>
        </ul>
      </div>
    </footer>
  </>;
};
