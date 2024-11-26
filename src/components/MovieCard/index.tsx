'use client'
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useFavoritesContext } from '@/contexts/FavoriteContext';
import { IMovie } from '@/types/moviesTypes';
import { FavoriteButton, VoteSpan } from '@/components'
import { IMAGE_URLS } from '@/constants/urls';
import errorImage from '@/assets/images/no-image.png'
interface movie {
  movie: IMovie
}
export default function MovieCard({ movie }: movie) {
  const { handleFavoriteMovie, isFavorite, isLoadingFavoriteAction } = useFavoritesContext()
  const favorite = isFavorite(movie?.id)
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(
    `${IMAGE_URLS?.url}${movie?.poster_path}`
  );

  return (
    <div className={"flex flex-col gap-1"}>
      <div className={"relative w-full h-full"}>
        <Image
          className={"w-[300px] h-[304px] object-cover"}
          src={imageSrc}
          alt="Movie Poster"
          width={300}
          height={304}
          onError={() => {
            setImageSrc(errorImage)
          }}
        />
        <div className={'absolute right-2 top-2 flex gap-3'}>
          <FavoriteButton loading={isLoadingFavoriteAction} isFavorite={favorite} onClick={() => handleFavoriteMovie(movie?.id)} />
          <VoteSpan vote={movie?.vote_average} />
        </div>
      </div>
      <Link className={'bg-purpleBg hover:opacity-50 select-none transition-3s active:opacity-100 text-center'} href={`/filmes/${movie.id}`}>
        Mais Informações
      </Link>
    </div>
  );
}
