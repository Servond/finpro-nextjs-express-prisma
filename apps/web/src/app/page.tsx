import Image from 'next/image'

import TalkShow from '@/assets/Talkshow.jpg'
import Food from '@/assets/Food.jpg'
import Fasion from '@/assets/Fasion.jpg'
import Seni from '@/assets/Seni.jpg'
import Picnic from '@/assets/Picnic.jpg'
import Konser from '@/assets/Konser.jpg'
import ReviewUser from '@/components/ReviewUser/ReviewUser'
import CardListLineUpHome from '@/components/CradListLineUp/CardListLineUpHome'

export default function Home() {
  return (
    <>
      {/* Content 1 */}
      {/* <div className="overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('../assets/Background.png')]">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center bg-gray-900/40 2xl:bg-transparent 2xl:from-gray-900/95 
          2xl:to-gray-900/25 ltr:2xl:bg-gradient-to-r rtl:2xl:bg-gradient-to-l">

          <div className="mx-auto max-w-8xl text-center">
            <h1 className="drop-shadow-md font-sans text-3xl font-extrabold text-yellow-600 sm:text-6xl 2xl:text-8xl ">
              HALAMAN BELAKANG <br />
              <strong className="font-serif drop-shadow-md text-xl font-bold text-white sm:block">
                Intimate Music Show With Green </strong>
            </h1>

            <p className="font-serif mt-4 text-white sm:text-xl/relaxed">
              Bogor, 13 - 14 Desember 2024
            </p>
          </div>
        </div>
      </div> */}

      {/* Content 2 */}
      {/* <section className="bg-black">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl text-white font-serif sm:text-4xl">
              Come Together ...
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">

            <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
              <Image
                alt=""
                src={Konser}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="lg:py-16">
              <article className="space-y-20 text-white font-serif">
                <p>
                  We can't wait to welcome you like-minded people, music lovers, passionate performers,
                  families, artists, musicians, creators, rebels, and refugees of a changing festival
                  lanscape to All Together Now.
                </p>
                <div>
                  <a href="/pages/tickets" className="rounded px-12 py-3 bg-yellow-600 hover:bg-white hover:text-black" >
                    BUY TICKET
                  </a>
                </div>

              </article>
            </div>
          </div>
        </div>
      </section> */}

      {/* Content 3 */}
      <div className="bg-white text-black">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <p className="text-5xl font-serif sm:text-5xl">Line-up</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 md:grid-cols-2 lg:gap-8 lg:grid-cols-3">

            <CardListLineUpHome />

          </div>
          <div className="mt-10 mx-auto max-w-lg text-center">
            <p className="font-serif">Plus many more to be announced for across 18 stages</p>
          </div>
        </div>
      </div>

      {/* Content 4 */}
      {/* <div className="overflow-hidden py-20 bg-cover bg-center bg-no-repeat bg-[url('../assets/Background2.jpg')]">
        <div className="mx-auto max-w-lg text-center text-white ">
          <h2 className="text-3xl font-serif sm:text-5xl">Experience...</h2>

          <p className="mt-4 font-serif">
            In addition to 18+ stages of music, spoken word, comedy, theatre...
          </p>
        </div>
      </div> */}

      {/* Component 5 */}
      {/* <section className="bg-black">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="block">
              <Image
                alt=""
                src={TalkShow}
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
              />

              <h3 className="mt-4 text-lg font-serif text-white sm:text-3xl">Talk Show</h3>

              <p className="mt-2 max-w-sm font-serif text-gray-400">
                Our beautiful oasis of wellness is located on the Lawns of Tranquility oevrlooking the lake,
                featuring Yoga sessions, Sauna treatments, Hot Tubs, Sound bath experiences and more.
              </p>
            </div>

            <div className="block">
              <Image
                alt=""
                src={Picnic}
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
              />

              <h3 className="mt-4 text-lg font-serif text-white sm:text-3xl">Picnic</h3>

              <p className="mt-2 max-w-sm font-serif text-gray-400">
                The renowned Greencrafts Village is an ATN must-do experience where you can take part in many
                gorgeous rutal, sustainable, craft making activities to make beautiful, ethical and parctical items to take
                home and treasure.
              </p>
            </div>

            <div className="block">
              <Image
                alt=""
                src={Seni}
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
              />

              <h3 className="mt-4 text-lg font-serif text-white sm:text-3xl">Show Art</h3>

              <p className="mt-2 max-w-sm font-serif text-gray-400">
                Kids Together is the perfect hang out for all the family, with a schedule jam packed full of activities
                across the weekend, from music in the Disco Shed, the Actual Reality Arcades life-sized interactive game zone,
                crafits and face-painting and more.
              </p>
            </div>

            <div className="block">
              <Image
                alt=""
                src={Food}
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
              />

              <h3 className="mt-4 text-lg font-serif text-white sm:text-3xl">Food & Feasts</h3>

              <p className="mt-2 max-w-sm font-serif text-gray-400">
                Having great food is also a festival essential and you will be spoiled for choice at ATN24.
                From sit dwon dinner experiences, artisanal food traders, to bespoke cockatails, foodies won't be
                disappointed.
              </p>
            </div>

            <div className="block">
              <Image
                alt=""
                src={Fasion}
                className="h-64 w-full object-cover sm:h-80 lg:h-96"
              />

              <h3 className="mt-4 text-lg font-serif text-white sm:text-3xl">Faison</h3>

              <p className="mt-2 max-w-sm font-serif text-gray-400">
                Seanchoiche hosts its own intimate stage across three days og the festival. It is a spase for people
                from all corners of life to come and listen and engage with spoken stories, ranging from personal
                anecdotes, monologues, fictional narratives, to poertry pieces and anything in between.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* <ReviewUser /> */}
    </>
  )
}