import Image from 'next/image';
import lineUp from '@/data/lineUp.json';

const CardListLineUpHome = () => {
  return (
    <>
      {lineUp.map((data) => {
        //   if(data.id <= 3) {
        return (
          <article
            key={data.id}
            className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg"
          >
            <Image
              alt=""
              src={data.path}
              width={500}
              height={500}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />

            <div className="relative pt-32 sm:pt-48 lg:pt-64">
              <div className="p-4 sm:p-6">
                <h1 className="mt-0.5 text-xl font-serif text-white lg:text-3xl">
                  {data.name}
                </h1>
              </div>
            </div>
          </article>
        );
        //   }
      })}
    </>
  );
};

export default CardListLineUpHome;
