'use client'
import { PopularMovies, Spinner } from '@/components';
import { useDestaquesPage } from './useDestaquesPage';

export default function Destaques() {
  const { data, isLoading, error } = useDestaquesPage()

  if (error) {
    <div>
      <h1>Filmes populares não encontrados...</h1>
    </div>
  }
  if (isLoading) {
    return (
      <div className={'w-full h-full flex items-center justify-center'}>
        <Spinner />
      </div>)
  }
  return (
    <div className={'w-full'}>
      <PopularMovies data={data} />
    </div>
  );
}
