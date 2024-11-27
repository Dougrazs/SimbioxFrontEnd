'use client'
import { useFilmes } from './useFilmes'
import { Input, Spinner, VerticalCard } from "@/components";
import PaginationSearch from '@/components/Pagination';
import { IMovie } from "@/types/moviesTypes";

export default function Filmes() {

  const { moviesSearched,
    handlePageChange,
    searchTerm,
    setSearchTerm,
    isLoading,
    currentPage,
    onSubmit, isFetching } = useFilmes()

  return (
    <div className="flex flex-col items-center gap-5">
      <form onSubmit={onSubmit} className="w-50 md:w-auto flex gap-5">
        <Input
          placeholder="Pesquisa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={'bg-slate-50 rounded-md p-2 font-semibold text-black hover:opacity-50 active:opacity-100 transition-3s'} type={'submit'}>Buscar</button>
      </form>

      <div className="w-full h-[73vh] md:h-[75vh] sm:h-[50vh] overflow-auto">
        {isFetching || isLoading ? (
          <div className="w-full flex items-center justify-center">
            <Spinner />
          </div>
        ) : moviesSearched?.results?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-hidden">
            {moviesSearched.results.map((movie: IMovie, index: number) => (
              <VerticalCard movie={movie} key={index} />
            ))}
          </div>
        ) : (
          <div className="w-full text-center">Pesquise por um filme...</div>
        )}
      </div>

      {moviesSearched?.results?.length > 0 &&
        <PaginationSearch
          currentPage={currentPage}
          totalPages={moviesSearched?.total_pages}
          isLoading={isFetching}
          handlePageChange={handlePageChange}
        />
      }

    </div>
  );
}
