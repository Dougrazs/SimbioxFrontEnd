'use client'
import { Spinner, VerticalCard } from '@/components';
import { useFavoritesContext } from '@/contexts/FavoriteContext';

export default function Favoritos() {
  const { favorites, loadingFavorites, errorFavorites } = useFavoritesContext()

  if (loadingFavorites) {
    return (<div className={'w-full py-10 flex items-center justify-center h-full'}><Spinner /></div>)
  }

  if (errorFavorites) {
    return <div>{errorFavorites}</div>;
  }

  if (favorites?.length === 0) {
    return (<div className={'w-full text-center'}>
      <h2>Nenhum filme favoritado</h2>
    </div>)
  }
  return (
    <div className="w-full h-[80vh] md:h-[90vh] overflow-auto">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-hidden">
        {favorites?.map((movie, index) => (
          <div key={index} className="flex justify-center w-full h-full">
            <VerticalCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
