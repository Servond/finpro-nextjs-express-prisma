import React from 'react'

import ReviewUser from '@/components/ReviewUser/ReviewUser';
import CardListLineUpDay1 from '@/components/CradListLineUp/CardListLineUpDay1';

const Day1 = () => {
  return (
    <>

      <section className="bg-white text-black">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <p className="text-4xl font-serif lg:text-5xl">Line-up Day 1</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-2 lg:gap-8 lg:grid-cols-3">

            <CardListLineUpDay1 />

          </div>
        </div>
      </section>

      <ReviewUser />
    </>
  )
}

export default Day1;