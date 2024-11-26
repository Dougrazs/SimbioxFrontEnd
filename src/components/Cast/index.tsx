import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useSwiperControllers } from '@/hooks';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import arrowFoward from '@/assets/icons/arrow-forward.svg';
import arrowBackard from '@/assets/icons/arrow-back.svg';

import { IMAGE_URLS } from '@/constants/urls';
import Image from 'next/image';
import { type CastMember } from '@/types/moviesTypes';
import errorImage from '@/assets/images/no-image.png';

interface CastProps {
  cast?: CastMember[];
}

export default function Cast({ cast }: CastProps) {
  const { handlePrev, handleNext, sliderRef } = useSwiperControllers();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = errorImage.src;
  };
  const isNavVisible = (cast?.length || 0) > 5;
  console.log({ isNavVisible })
  return (
    <div className={'relative pb-5'}>
      <div className={`hidden md:${isNavVisible ? 'flex' : 'hidden'} absolute items-start center-absolute h-auto z-30 bottom-0`}>
        <button
          onClick={handlePrev}
          className="transition-all bg-opacity-5 px-3 hover:opacity-50 active:opacity-100"
        >
          <Image alt={'voltar'} src={arrowBackard} />
        </button>
        <button
          onClick={handleNext}
          className=" bg-white h-0 transition-all bg-opacity-5 px-3 hover:opacity-50 active:opacity-100"
        >
          <Image alt={'avançar'} src={arrowFoward} />
        </button>
      </div>

      <Swiper
        ref={sliderRef}
        spaceBetween={10}
        slidesPerView={10}
        breakpoints={{
          '@0.00': {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 7,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 8,
            spaceBetween: 50,
          },
        }}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
      >
        {cast?.map((actor) => (
          <SwiperSlide key={actor.id}>
            <div className={'flex flex-col text-gray items-center'}>
              <Image
                className={'rounded-full h-[5rem] w-[5rem] drag-none select-none object-cover'}
                alt={`foto do ator ${actor?.name}`}
                width={80}
                height={80}
                src={actor?.profile_path ? `${IMAGE_URLS.url}${actor?.profile_path}` : errorImage.src}
                onError={handleImageError}
              />
              <h3 className={'text-center select-none'}>{actor?.name?.split(' ').slice(0, 2).join(' ')}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
