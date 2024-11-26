'use client'
import React from "react";
import { useFilmePage } from "./useFilmePage";
import { useParams } from 'next/navigation'
import { FavoriteButton, Spinner, VoteSpan } from '@/components'
import { useFavoritesContext } from "@/contexts/FavoriteContext";
import { Cast } from '@/components'
import { IMAGE_URLS } from '@/constants/urls'
export default function PaginaFilme() {
  const { id } = useParams<{ id: string }>()
  const idNumber = parseInt(id) as number

  const { data, isLoading, error } = useFilmePage(id);
  const { isFavorite, handleFavoriteMovie, isLoadingFavoriteAction } = useFavoritesContext()

  if (isLoading) return <div className={'w-full flex items-center justify-center'}><Spinner /></div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={'w-full h-[90vh] overflow-auto p-3'}>
      <div
        className="w-full h-[50vh] rounded-md bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent, rgba(0, 0, 0)), url(${IMAGE_URLS.url}${data?.backdrop_path})`,
        }}
      />

      <section className={'flex flex-col gap-3'}>
        <div className={'flex flex-col gap-2'}>
          <div className={'flex justify-between'}>
            <h2 className={'text-3xl font-bold'}>{data?.title}</h2>
            <div className={'flex gap-5'}>
              <FavoriteButton onClick={() => handleFavoriteMovie(idNumber)} loading={isLoadingFavoriteAction} isFavorite={isFavorite(idNumber)}></FavoriteButton>
              <VoteSpan vote={data?.vote_average} />
            </div>
          </div>

          <div className={'flex items-center gap-2 text-gray'}>
            <h4>{data?.runtime} Minutos</h4>
            <h5 className={'text-sm'}>—</h5>
            {
              data?.genres?.map((genre, index) => (
                <span key={genre.id}>
                  {genre?.name}
                  {index < data.genres.length - 1 && ', '}
                </span>
              ))
            }
            <h5 className={'text-sm'}>—</h5>
            <h4>{data?.release_date?.split('-')[0]}</h4>
          </div>
        </div>

        <div>
          <h3>{data?.overview}</h3>
        </div>

        <div className={'flex flex-col gap-2'}>
          <h2 className={'font-semibold text-xl'}>Elenco</h2>
          <Cast cast={data?.cast} />
        </div>

      </section>
    </div>
  );
}
