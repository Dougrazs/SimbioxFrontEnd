import { useQuery } from '@tanstack/react-query';
import { type IMovie } from '@/types/moviesTypes';

export const useFilmePage = (id: string | string[] | undefined) => {
  const fetchFilme = async () => {
    const response = await fetch(`http://localhost:3005/api/movie/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch filme');
    }

    return response.json();
  };

  const { data, isLoading, error } = useQuery<IMovie>({
    queryKey: ['Filme', id],
    queryFn: fetchFilme,
    refetchOnWindowFocus: true,
    retry: 2,
  })

  return { data, isLoading, error }

}