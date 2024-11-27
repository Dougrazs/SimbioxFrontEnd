'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { IPopularMovie } from '@/types/popularMovieTypes';
import { FavoriteButton, VoteSpan } from '@/components';
import { useFavoritesContext } from '@/contexts/FavoriteContext';
import { useSwiperControllers } from '@/hooks';
import { IMAGE_URLS } from '@/constants/urls'
import Link from 'next/link';
import Image from 'next/image';
import arrowBack from '@/assets/icons/arrow-back.svg'
import arrowFoward from '@/assets/icons/arrow-forward.svg'
import { useIsMobileDevice } from '@/hooks';
interface PopularMoviesProps {
  data: IPopularMovie[];
}

export default function PopularMovies({ data }: PopularMoviesProps) {
  const { handlePrev, handleNext, sliderRef } = useSwiperControllers()
  const { isFavorite, handleFavoriteMovie, isLoadingFavoriteAction } = useFavoritesContext()
  const isMobile = useIsMobileDevice()

  return (
    <div className="relative w-full">
      <button
        onClick={handlePrev}
        className="absolute bg-white left-0 h-full z-30 transition-all bg-opacity-5 px-3 hover:opacity-50 active:opacity-100"
      >
        <Image alt="voltar" width={24} src={arrowBack} />

      </button>

      <Swiper
        ref={sliderRef}
        spaceBetween={10}
        slidesPerView={1}
        keyboard={{
          enabled: true,
          onlyInViewport: true
        }}
        pagination={{ type: 'fraction' }}
        loop
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
      >
        {data?.map((movie: IPopularMovie) => {

          const backgroundUrl = isMobile
            ? `${IMAGE_URLS?.url}${movie?.poster_path}`
            : `${IMAGE_URLS?.url}${movie?.backdrop_path}`;

          return (
            <SwiperSlide key={movie.id}>
              <div className="absolute center-absolute z-30 bg-purpleBg bg-opacity-90 md:bg-opacity-80 p-3 rounded-md bottom-14 flex flex-col items-center md:items-start gap-2 md:left-[5rem] md:translate-x-0 text-white">
                <div className={'flex flex-col gap-2 text-center md:text-start'}>
                  <h2 className="text-lg font-bold md:text-5xl" >{movie.title}</h2>
                  <h3 className="text-sm opacity-80 hidden md:block">{movie.genres}</h3>
                  <h3 className="text-sm opacity-80 hidden md:block">{movie.release_date.split('-')[0]}</h3>
                </div>

                <p className="hidden md:block text-lm max-w-lg line-clamp-5 overflow-auto h-20">
                  {movie.overview}
                </p>
                <Link className={'text-white underline hover:opacity-50 select-none transition-3s active:opacity-100 text-center'} href={`/filmes/${movie.id}`}>
                  Mais Informações
                </Link>
              </div>
              <div className={'absolute w-fit center-absolute z-10 top-5 flex items-center gap-5 md:right-20 md:left-auto md:translate-x-0'} >
                <FavoriteButton loading={isLoadingFavoriteAction} isFavorite={isFavorite(movie?.id)} onClick={() => handleFavoriteMovie(movie.id)} />
                <VoteSpan vote={movie?.vote_average} />
              </div>

              <div
                className="w-full h-screen"
                style={{
                  backgroundImage: `url(${backgroundUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundAttachment: 'fixed',
                  height: isMobile ? '75vh' : '90vh',
                  filter: 'brightness(70%)',
                  backgroundBlendMode: 'overlay',
                  overflow: 'hidden',
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button
        onClick={handleNext}
        className="absolute bg-white right-0 top-0 h-full z-30 transition-all bg-opacity-5 px-3 hover:opacity-50 active:opacity-100"
      >
        <Image alt="avançar" width={24} src={arrowFoward} />
      </button>
    </div>
  );
}
